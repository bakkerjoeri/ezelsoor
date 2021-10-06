import uuid from "@bakkerjoeri/uuid";
import { derived, get, writable } from "svelte/store";
import { createLocalStore } from "./localStore";
import type { Readable, Writable } from "svelte/store";
import { entityBeingEdited } from "./ui";
import { removeDiacretics } from "../utils/removeDiacretics";

export interface Bookmark {
	readonly id: string;
	url: string;
	title: string;
	notes: string;
	tags: string[];
	isFavorite: boolean;
	isArchived: boolean;
	isToRead: boolean;
	createdAt: number;
	dateCreated?: number;
	summary?: string;
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

export function hasBookmark(bookmarkId: Bookmark["id"]): boolean {
	return get(bookmarks).some((bookmark) => bookmark.id === bookmarkId);
}

export function getBookmark(bookmarkId: Bookmark["id"]): Bookmark {
	const bookmark = get(bookmarks).find(
		(bookmark) => bookmark.id === bookmarkId
	);

	if (!bookmark) {
		throw new Error(`Couldn't find bookmark with ID ${bookmarkId}`);
	}

	return bookmark;
}

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
		createdAt: Date.now().valueOf(),
		...properties,
	};
}

export const bookmarkBeingEdited: Readable<Bookmark | null> = derived(
	[bookmarks, entityBeingEdited],
	([$bookmarks, $entityBeingEdited]) => {
		if (!$entityBeingEdited) {
			return null;
		}

		if ($entityBeingEdited.type !== "bookmark") {
			return null;
		}

		if (!hasBookmark($entityBeingEdited.id)) {
			return null;
		}

		return getBookmark($entityBeingEdited.id);
	}
);

export function searchBookmarks(bookmarks: Bookmark[], query: string) {
	if (!query) {
		return bookmarks;
	}

	return bookmarks.filter((bookmark) =>
		doesBookmarkMatchQuery(bookmark, query)
	);
}

export function doesBookmarkMatchQuery(bookmark: Bookmark, query: string) {
	const normalizedQuery = removeDiacretics(query.toLowerCase());

	const normalizedBookmarkTitle = removeDiacretics(
		bookmark.title.toLowerCase()
	);
	const normalizedSummary = removeDiacretics(bookmark.notes.toLowerCase());
	const normalizedTags = removeDiacretics(bookmark.tags.join().toLowerCase());

	return normalizedQuery.split(" ").every((queryPart) => {
		return (
			normalizedBookmarkTitle.indexOf(queryPart) >= 0 ||
			normalizedSummary.indexOf(queryPart) >= 0 ||
			normalizedTags.indexOf(queryPart) >= 0 ||
			bookmark.url.indexOf(queryPart) > 0
		);
	});
}
