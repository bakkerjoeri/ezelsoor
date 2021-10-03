import uuid from "@bakkerjoeri/uuid";
import { derived, writable } from "svelte/store";
import { createLocalStore } from "./localStore";
import type { Readable, Writable } from "svelte/store";
import { createFireStore } from "./firestore";

export interface Bookmark {
	readonly id: string;
	url: string;
	title: string;
	notes: string;
	tags: string[];
	isFavorite: boolean;
	isArchived: boolean;
	isToRead: boolean;
	dateCreated: number;
}

function createBookmarkStore(
	baseStore: Writable<Bookmark[]> = writable<Bookmark[]>([])
) {
	const { subscribe, set, update } = baseStore;

	return {
		subscribe,
		set,
		update,
		patch(id: Bookmark["id"], newData: Partial<Bookmark>): void {
			update((bookmarks) => {
				return bookmarks.map((bookmark) => {
					if (bookmark.id === id) {
						return { ...bookmark, ...newData };
					}

					return bookmark;
				});
			});
		},
		add: (bookmark: Bookmark): void => {
			update((bookmarks) => {
				return [...bookmarks, bookmark];
			});
		},
		delete: (id: Bookmark["id"]): void => {
			update((bookmarks) =>
				bookmarks.filter((bookmark) => bookmark.id !== id)
			);
		},
	};
}

const localStore = createLocalStore<Bookmark[]>("bookmarks", []);
// const fireStore = createFireStore(null);
export const bookmarks = createBookmarkStore(localStore);
export const activeBookmarks = derived(bookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => !bookmark.isArchived)
);
export const bookmarksToRead = derived(bookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => bookmark.isToRead)
);
export const favoriteBookmarks = derived(bookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => bookmark.isFavorite)
);
export const archivedBookmarks = derived(bookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => bookmark.isArchived)
);
export const untaggedBookmarks = derived(bookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => bookmark.tags.length === 0)
);
export const tagCount: Readable<{ [tagName: string]: number }> = derived(
	activeBookmarks,
	(bookmarks) => {
		return bookmarks.reduce((tags, bookmark) => {
			return bookmark.tags.reduce((tags, tag) => {
				return {
					...tags,
					[tag]: tags.hasOwnProperty(tag) ? tags[tag] + 1 : 1,
				};
			}, tags);
		}, {});
	}
);

export function createNewBookmark(
	properties: Partial<Bookmark> = {}
): Bookmark {
	return {
		id: uuid(),
		url: "",
		title: "",
		notes: "",
		tags: [],
		isFavorite: false,
		isArchived: false,
		isToRead: false,
		dateCreated: Date.now().valueOf(),
		...properties,
	};
}

export const bookmarkBeingEdited = writable<Bookmark | null>(null);
