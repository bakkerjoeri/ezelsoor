import uuid from "@bakkerjoeri/uuid";
import { derived, get } from "svelte/store";
import { entityBeingEdited } from "./ui";
import { removeDiacretics } from "../utils/removeDiacretics";
import { firestoreUserCollection } from "./firestore";
import type { Readable } from "svelte/store";
import { localStore } from "./localStore";
import { collectionStore } from "./collectionStore";
import { database } from "../utils/firebase";

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
}

export type BookmarksSortedBy = "title" | "createdAt";

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

function createBookmarkStore() {
	const local = localStore<Bookmark[]>("bookmarks", []);
	const remote = firestoreUserCollection<Bookmark>(
		database,
		"bookmarks",
		local
	);
	const collection = collectionStore<Bookmark>(remote);

	return collection;
}

export const bookmarks = createBookmarkStore();

export const activeBookmarks = derived(bookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => !bookmark.isArchived)
);
export const bookmarksToRead = derived(activeBookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => bookmark.isToRead)
);
export const favoriteBookmarks = derived(activeBookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => bookmark.isFavorite)
);
export const archivedBookmarks = derived(bookmarks, (bookmarks) =>
	bookmarks.filter((bookmark) => bookmark.isArchived)
);
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
