import uuid from '@bakkerjoeri/uuid';
import { Writable, writable } from 'svelte/store';
import { createLocalStore } from './localStore';

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

function createBookmarkStore(baseStore: Writable<Bookmark[]> = writable<Bookmark[]>([])) {
	const { subscribe, set, update } = baseStore;

	return {
		subscribe,
		set,
		update,
		patch(id: Bookmark['id'], newData: Partial<Bookmark>): void {
			update(bookmarks => {
				return bookmarks.map(bookmark => {
					if (bookmark.id === id) {
						return { ...bookmark, ...newData };
					}

					return bookmark;
				});
			});
		},
		add: (bookmark: Bookmark): void => {
			update(bookmarks => {
				return [
					...bookmarks,
					bookmark,
				];
			});
		},
		delete: (id: Bookmark['id']): void => {
			update(bookmarks => bookmarks.filter(bookmark => bookmark.id !== id));
		},
	}
}

const localStore = createLocalStore<Bookmark[]>('easelear-bookmarks', []);
export const bookmarks = createBookmarkStore(localStore);

export function createNewBookmark(properties: Partial<Bookmark> = {}): Bookmark {
	return {
		id: uuid(),
		url: '',
		title: '',
		notes: '',
		tags: [],
		isFavorite: false,
		isArchived: false,
		isToRead: false,
		dateCreated: Date.now().valueOf(),
		...properties,
	};
}

export const bookmarkBeingEdited = writable<Bookmark | null>(null);
