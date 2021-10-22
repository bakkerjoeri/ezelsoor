import { localStore } from "./localStore";
import uuid from "@bakkerjoeri/uuid";
import { derived, get, Readable, writable } from "svelte/store";
import type { Bookmark } from "./bookmarks";
import type { Writable } from "svelte/store";
import { entityBeingEdited } from "./ui";
import { navigate } from "svelte-routing";

export interface List {
	id: string;
	title: string;
	description: string;
	bookmarks: Array<Bookmark["id"]>;
	createdAt: number;
}

function createListStore(baseStore: Writable<List[]> = writable<List[]>([])) {
	const { subscribe, set, update } = baseStore;

	return {
		subscribe,
		set,
		update,
		updateList(id: List["id"], updater: (list: List) => List): void {
			update((lists) => {
				return lists.map((list) => {
					if (list.id === id) {
						return updater(list);
					}

					return list;
				});
			});
		},
		patch(id: List["id"], newData: Partial<List>): void {
			update((lists) => {
				return lists.map((list) => {
					if (list.id === id) {
						return { ...list, ...newData };
					}

					return list;
				});
			});
		},
		delete: (id: List["id"]): void => {
			if (window.location.pathname.startsWith("/list/")) {
				navigate("/");
			}

			update((lists) => lists.filter((list) => list.id !== id));
		},
	};
}

export const lists = createListStore(localStore("lists", []));

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
		createdAt: Date.now().valueOf(),
		bookmarks: [],
		...properties,
	};
}
