import Vue from 'vue'
import Vuex from 'vuex'
import uuid from './../utility/uuid.js';

Vue.use(Vuex)

export const DEFAULT_BOOKMARK_PROPERTIES = {
	url: '',
	title: '',
	summary: '',
	tags: [],
	isFavorite: false,
	isArchived: false,
	isToRead: false,
	dateCreated: null,
};

export default new Vuex.Store({
	state: {
		bookmarks: {
			all: {},
		},
	},
	mutations: {
		fetch(state) {
			if (localStorage.getItem('state')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('state')))
				);
			}
		},
		addBookmark(state, payload) {
			let newBookmark = createBookmark(payload);
			Vue.set(state.bookmarks.all, newBookmark.id, newBookmark);
		},
		deleteBookmark(state, payload) {
			Vue.delete(state.bookmarks.all, payload.id);
		},
		updateBookmark(state, bookmark) {
			state.bookmarks.all[bookmark.id] = {
				...state.bookmarks.all[bookmark.id],
				...bookmark,
			};
		},
		setBookmarkIsToRead(state, payload) {
			Vue.set(state.bookmarks.all[payload.id], 'isToRead', payload.isToRead);
		},
		setBookmarkIsFavorite(state, payload) {
			Vue.set(state.bookmarks.all[payload.id], 'isFavorite', payload.isFavorite);
		},
		setBookmarkIsArchived(state, payload) {
			Vue.set(state.bookmarks.all[payload.id], 'isArchived', payload.isArchived);
		},
	},
	getters: {
		allBookmarks: state => {
			return Object.values(state.bookmarks.all);
		},
		bookmarkWithId: (state) => bookmarkId => {
			return state.bookmarks.all[bookmarkId];
		},
		activeBookmarks: (state, getters) => {
			return getters.allBookmarks.filter((bookmark) => {
				return !bookmark.isArchived;
			});
		},
		archivedBookmarks: (state, getters) => {
			return getters.allBookmarks.filter((bookmark) => {
				return bookmark.isArchived;
			});
		},
		favoriteBookmarks: (state, getters) => {
			return getters.allBookmarks.filter((bookmark) => {
				return bookmark.isFavorite;
			});
		},
		toReadBookmarks: (state, getters) => {
			return getters.allBookmarks.filter((bookmark) => {
				return bookmark.isToRead;
			});
		},
		tagCount: (state, getters) => {
			return getters.allBookmarks.reduce((tags, bookmark) => {
				return bookmark.tags.reduce((tags, tag) => {
					if (tags.hasOwnProperty(tag)) {
						return {
							...tags,
							[tag]: tags[tag] + 1,
						};
					}

					return {
						...tags,
						[tag]: 1,
					};
				}, tags);
			}, {});
		},
		tagsOfBookmarkWithId: (state, getters) => bookmarkId => {
			return getters.bookmarkWithId(bookmarkId).tags;
		},
		bookmarksWithTags: (state, getters) => tags => {
			return getters.allBookmarks.filter((bookmark) => {
				return tags.every((tag) => {
					return bookmark.tags.includes(tag);
				});
			});
		},
	},
});

function createBookmark(properties = {}) {
	if (!properties.id) {
		properties.id = uuid();
	}

	if (!properties.dateCreated) {
		properties.dateCreated = new Date().valueOf();
	}

	return {
		...DEFAULT_BOOKMARK_PROPERTIES,
		...properties,
	};
}
