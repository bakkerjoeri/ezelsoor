import { get, writable } from "svelte/store";
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
import type { StartStopNotifier, Updater } from "svelte/store";
import type { CollectionReference, DocumentData } from "firebase/firestore";

interface Document {
	id: string;
	[key: string]: any;
}

export function userCollectionStore<TValue extends Document>(path: string) {
	let reference: CollectionReference<DocumentData> | null = null;

	const start: StartStopNotifier<TValue[]> = (set) => {
		return loggedInUserId.subscribe((userId) => {
			if (!userId) {
				return;
			}

			reference = collection(database, `users/${userId}/${path}`);

			return onSnapshot(reference, (snapshot) => {
				const newValue = snapshot.docs.map((doc) =>
					doc.data()
				) as TValue[];

				set(newValue);
			});
		});
	};

	const store = writable<TValue[]>([], start);

	const add = async (document: Document) => {
		await setDoc(doc(reference, document.id), document);
	};

	const patch = async (id: string, newValue: any) => {
		await updateDoc(doc(reference, id), newValue);
	};

	const remove = async (id: string) => {
		deleteDoc(doc(reference, id));
	};

	const set = async (value: TValue[]): Promise<void> => {
		if (reference === null) {
			throw new Error("Can't access collection when not authenticated.");
		}

		const diff = findCollectionDiff(get(store), value);

		await Promise.all(
			diff.map((diffItem) => {
				if (diffItem.operation === "added") {
					return add(diffItem);
				}

				if (diffItem.operation === "modified") {
					return patch(diffItem.id, diffItem.data);
				}

				if (diffItem.operation === "removed") {
					return remove(diffItem.id);
				}
			})
		);
	};

	const update = async (updater: Updater<TValue[]>) => {
		const value = updater(get(store));
		await set(value);
	};

	const { subscribe } = store;

	return { subscribe, set, update, add, patch, remove };
}
