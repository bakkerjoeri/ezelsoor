import { localStore } from "./localStore";
import uuid from "@bakkerjoeri/uuid";
import { derived, get } from "svelte/store";
import { entityBeingEdited } from "./ui";
import { firestoreUserCollection } from "./firestore";
import { database } from "../utils/firebase";
import { collectionStore } from "./collectionStore";
import type { Readable } from "svelte/store";
import type { Bookmark } from "./bookmarks";

export interface List {
	id: string;
	title: string;
	description: string;
	showBookmarkCount: boolean;
	bookmarks: Array<Bookmark["id"]>;
	createdAt: number;
}

function createListStore() {
	const local = localStore<List[]>("lists", []);
	const remote = firestoreUserCollection<List>(database, "lists", local);
	const collection = collectionStore<List>(remote);

	return collection;
}

export const lists = createListStore();

export function hasList(listId: List["id"]): boolean {
	return get(lists).some((list) => list.id === listId);
}

export function getList(listId: List["id"]): List {
	const list = get(lists).find((list) => list.id === listId);

	if (!list) {
		throw new Error(`Couldn't find list with ID ${listId}`);
	}

	return list;
}

export const listBeingEdited: Readable<List | null> = derived(
	[lists, entityBeingEdited],
	([$lists, $entityBeingEdited]) => {
		if (!$entityBeingEdited) {
			return null;
		}

		if ($entityBeingEdited.type !== "list") {
			return null;
		}

		if (!hasList($entityBeingEdited.id)) {
			return null;
		}

		return getList($entityBeingEdited.id);
	}
);

export function createNewList(properties: Partial<List> = {}): List {
	return {
		id: uuid(),
		title: "",
		description: "",
		showBookmarkCount: false,
		createdAt: Date.now().valueOf(),
		bookmarks: [],
		...properties,
	};
}
