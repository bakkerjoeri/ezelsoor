import { get, writable } from "svelte/store";
import { isEqual } from "lodash-es";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
	getDocs,
} from "firebase/firestore";
import { findCollectionDiffDeep } from "../utils/findCollectionDiff";
import {
	loggedInState,
	loggedInUserId,
	previousLoggedInState,
} from "./session";
import { compare } from "../utils/sorting";
import { mergeCollections } from "../utils/mergeCollections";

import type {
	CollectionReference,
	DocumentData,
	Firestore,
} from "firebase/firestore";

interface ObjectWithId {
	id: string;
	[key: string]: any;
}

/**
 * A svelte store that's connected to a firestore collection. This store will be able to fetch & persist data with firestore once the user is logged in. While logged out, the data is only committed to the base store.
 *
 * **This store currently has a fatal flaw that could cause data loss**: It is assumes any snapshot update represents the latest data. Consider this example:
 *
 * You've just saved an item and this change is synced to firestore. While waiting for the corresponding snapshot update, you change that item again. Then the snapshot update comes in from the server, which will override the newer, local version of the item.
 *
 * @param path The path relative to `users/:userId/` where the collection is found. Make sure you omit any leading `/`.
 * @param store The base svelte store that is synced to firestore. If you don't provide one, the function will init its own.
 */
export function firestoreUserCollection<Item extends ObjectWithId>(
	database: Firestore,
	path: string,
	store = writable<Item[]>([])
) {
	const initial = get(store);
	const { subscribe, set } = store;

	let currentLocalValue = initial;
	let cleanup = null;

	loggedInState.subscribe(async (state) => {
		const previousState = get(previousLoggedInState);
		const authLoadedIntoLoggedIn =
			state === "loggedIn" && previousState === "loading";
		const authLoadedIntoLoggedOut =
			state === "loggedOut" && previousState === "loading";
		const userLoggedIn =
			state === "loggedIn" && previousState === "loggedOut";
		const userLoggedOut =
			state === "loggedOut" && previousState === "loggedIn";

		if (authLoadedIntoLoggedIn || userLoggedIn) {
			const reference = collection(
				database,
				`users/${get(loggedInUserId)}/${path}`
			);

			/*
			Whether the user was already logged in during a previous session or they have just logged in is an important factor in deciding what to do with the data currently in the store, hence the split below.

			In the case that authentication loaded into a logged in state (which means the user was previously logged in) only the changes that happened while authentication was loading should be persisted. Anything before that is assumed to be persisted already.

			In the case that the user just now logged in all any work they did while logged out needs to be fully persisted to the server. Any data in the store is assumed to have never been persisted before this moment.
			*/

			if (authLoadedIntoLoggedIn) {
				// Persist any changes to the store done while auth was loading.
				await persistCollectionChanges(reference, get(store), initial);
				const remoteData = (await getDocs(reference)).docs.map((doc) =>
					doc.data()
				) as Item[];
				set(remoteData);
				currentLocalValue = remoteData;
			}

			if (userLoggedIn) {
				// Merge existing local data onto remote data and persist the differences.
				const remoteData = (await getDocs(reference)).docs.map((doc) =>
					doc.data()
				) as Item[];
				const allData = mergeCollections(remoteData, get(store));
				set(allData);
				currentLocalValue = allData;
				await persistCollectionChanges(reference, allData, remoteData);
			}

			// Subscribe to remote changes so they're reflected locally
			const snapshotUnsub = onSnapshot(reference, (snapshot) => {
				const oldValue = get(store);
				const newValue = snapshot.docs.map((doc) =>
					doc.data()
				) as Item[];

				if (!isSameCollection(newValue, oldValue)) {
					store.set(newValue);
				}
			});

			// Subscribe to local changes to reflect them remotely
			const storeUnsub = subscribe((newLocalValue) => {
				persistCollectionChanges(
					reference,
					newLocalValue,
					currentLocalValue
				);

				currentLocalValue = newLocalValue;
			});

			cleanup = () => {
				snapshotUnsub();
				storeUnsub();
			};

			return cleanup;
		}

		if (userLoggedOut) {
			if (cleanup) {
				cleanup();
				cleanup = null;
			}

			set([]);
		}
	});

	return store;
}

async function persistCollectionChanges<Item extends ObjectWithId>(
	collectionReference: CollectionReference<DocumentData>,
	newCollection: Item[],
	oldCollection: Item[] = []
) {
	if (isSameCollection(oldCollection, newCollection)) {
		return;
	}

	const differences = findCollectionDiffDeep(oldCollection, newCollection);
	const operations = differences.map((diffItem) => {
		if (diffItem.operation === "added") {
			return addDocumentToCollection(collectionReference, diffItem.data);
		}

		if (diffItem.operation === "modified") {
			return patchDocumentInCollection(
				collectionReference,
				diffItem.id,
				diffItem.data
			);
		}

		if (diffItem.operation === "removed") {
			return removeDocumentFromCollection(
				collectionReference,
				diffItem.id
			);
		}
	});

	await Promise.all(operations);
}

async function addDocumentToCollection(
	reference: CollectionReference<DocumentData>,
	document: ObjectWithId
) {
	await setDoc(doc(reference, document.id), document);
}

async function patchDocumentInCollection(
	reference: CollectionReference<DocumentData>,
	id: string,
	newValue: any
) {
	await updateDoc(doc(reference, id), newValue);
}

async function removeDocumentFromCollection(
	reference: CollectionReference<DocumentData>,
	id: string
) {
	deleteDoc(doc(reference, id));
}

/**
 * Does a deep comparison of two arrays.
 *
 * The arrays must contain objects with an `id` property, which is used to sort each arrays. This ensures we can check for deep equality without factoring in order.
 */
function isSameCollection<Item extends ObjectWithId>(
	collection: Item[],
	otherCollection: Item[]
) {
	if (collection === otherCollection) {
		return true;
	}

	function sortById(items: Item[]) {
		return [...items].sort((a, b) => compare(a.id, b.id));
	}

	return isEqual(sortById(collection), sortById(otherCollection));
}
