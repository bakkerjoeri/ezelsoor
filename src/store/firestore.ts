import { writable } from "svelte/store";
import { isEqual } from "lodash-es";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { findCollectionDiff } from "../utils/findCollectionDiff";
import { database } from "../utils/firebase";
import { loggedInUserId } from "./session";
import type { CollectionReference, DocumentData } from "firebase/firestore";

interface ObjectWithId {
	id: string;
	[key: string]: any;
}

async function persistCollectionChanges<Item extends ObjectWithId>(
	collectionReference: CollectionReference<DocumentData>,
	oldCollection: Item[],
	newCollection: Item[]
) {
	const diff = findCollectionDiff(oldCollection, newCollection);
	const operations = diff.map((diffItem) => {
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

export function firestoreUserCollection<TValue extends ObjectWithId>(
	path: string,
	initial: TValue[] = []
) {
	let reference: CollectionReference<DocumentData> | null = null;
	let snapshotUnsub = null;

	const store = writable<TValue[]>(initial, (set) => {
		return loggedInUserId.subscribe((userId) => {
			if (userId) {
				reference = collection(database, `users/${userId}/${path}`);
				snapshotUnsub = onSnapshot(reference, (snapshot) => {
					const newValue = snapshot.docs.map((doc) =>
						doc.data()
					) as TValue[];

					set(newValue);
				});
			}

			if (!userId) {
				if (snapshotUnsub) {
					snapshotUnsub();
					snapshotUnsub = null;
				}

				reference = null;
				set([]);
			}

			if (snapshotUnsub) {
				return snapshotUnsub;
			}
		});
	});

	const { subscribe, set, update } = store;

	let oldValue: TValue[] = initial;

	subscribe(async (value) => {
		if (!reference) {
			return;
		}

		if (isEqual(value, oldValue)) {
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
