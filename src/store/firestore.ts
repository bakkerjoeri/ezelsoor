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
import { findCollectionDiff } from "../utils/findCollectionDiff";
import { database } from "../utils/firebase";
import {
	loggedInState,
	loggedInUserId,
	previousLoggedInState,
} from "./session";
import type { CollectionReference, DocumentData } from "firebase/firestore";
import { compare } from "../utils/sorting";
import { localStore } from "./localStore";
import type { Writable } from "svelte/store";
import { mergeCollections } from "../utils/mergeCollections";

interface ObjectWithId {
	id: string;
	[key: string]: any;
}

/**
 * Creates a svelte store that's connected to a firestore collection. This store will be able to fetch & persist data with firestore once the user is logged in.
 *
 * **This store currently has a fatal flaw that could cause data loss**: It is assumes any snapshot update represents the latest data. Consider this example:
 *
 * You've just saved an item and this change is synced to firestore. While waiting for the corresponding snapshot update, you change that item again. Then the snapshot update comes in from the server, which will override the newer, local version of the item.
 *
 * @param path The path relative to `users/:userId/` where the collection is found. Make sure you omit any leading `/`.
 * @param shouldPersistLocally Whether or not to use localStorage to store data client side. This will also allow logged out persistance between sessions.
 */
export function firestoreUserCollection<TValue extends ObjectWithId>(
	path: string,
	shouldPersistLocally: boolean = false
) {
	let reference: CollectionReference<DocumentData> | null = null;
	let snapshotUnsub = null;

	const store = shouldPersistLocally
		? localStore<TValue[]>(path, [])
		: writable<TValue[]>([]);

	const initial = get(store);
	const { subscribe, set, update } = store;

	loggedInState.subscribe(async (state) => {
		const previousState = get(previousLoggedInState);

		if (state === "loggedIn") {
			reference = collection(
				database,
				`users/${get(loggedInUserId)}/${path}`
			);

			const localData = get(store);
			const remoteData = (await getDocs(reference)).docs.map((doc) =>
				doc.data()
			) as TValue[];
			const allData = mergeCollections(remoteData, localData);

			set(allData);
			await persistCollectionChanges(reference, remoteData, allData);
			snapshotUnsub = subscribeToCollectionSnapshot(reference, store);

			return snapshotUnsub;
		}

		if (state === "loggedOut") {
			reference = null;

			if (snapshotUnsub) {
				snapshotUnsub();
				snapshotUnsub = null;
			}
		}

		if (state === "loggedOut" && previousState === "loggedIn") {
			set([]);
		}
	});

	let oldValue: TValue[] = initial;

	// Data is pushed to the firestore as soon as changes are made locally.
	subscribe(async (value) => {
		if (!reference) {
			return;
		}

		/*
		I need this check to ensure the first wave of remote data isn't immediately synced back to the server. If the initial value is `[]` and the new value is an array of any size, it would otherwise be seen as a change.
		*/
		if (oldValue === initial) {
			oldValue = value;
			return;
		}

		persistCollectionChanges<TValue>(reference, oldValue, value);
		oldValue = value;
	});

	const add = (item: TValue) => {
		update((collection) => {
			return [...collection, item];
		});
	};

	const patch = (id: string, newValue: Partial<TValue>) => {
		update((collection) => {
			return collection.map((item) => {
				if (item.id !== id) {
					return item;
				}

				return {
					...item,
					...newValue,
				};
			});
		});
	};
	const remove = (id: string) => {
		update((collection) => {
			return collection.filter((item) => {
				return item.id !== id;
			});
		});
	};

	return { subscribe, set, update, add, patch, remove };
}

function subscribeToCollectionSnapshot<Item extends ObjectWithId>(
	collectionReference: CollectionReference<DocumentData>,
	store: Writable<Item[]>
) {
	const unsub = onSnapshot(collectionReference, (snapshot) => {
		const oldValue = get(store);
		const newValue = snapshot.docs.map((doc) => doc.data()) as Item[];

		if (!isSameCollection(newValue, oldValue)) {
			store.set(newValue);
		}
	});

	return unsub;
}

async function persistCollectionChanges<Item extends ObjectWithId>(
	collectionReference: CollectionReference<DocumentData>,
	oldCollection: Item[],
	newCollection: Item[]
) {
	if (isSameCollection(oldCollection, newCollection)) {
		return;
	}

	const differences = findCollectionDiff(oldCollection, newCollection);
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
