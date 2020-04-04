import Vue from 'vue'
import Vuex from 'vuex'
import uuid from './../utility/uuid.js';
import { database } from './../utility/firebase.js';

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
		users: {
			all: {},
			loggedInUserId: null,
		},
	},
	actions: {
		login: async ({ dispatch, commit }, userId) => {
			commit('setLoggedInUser', userId);
			await dispatch('syncLocalBookmarks', userId);
			await dispatch('fetchRemoteBookmarks', userId);
		},
		logout: ({ commit }) => {
			commit('clearLoggedInUser');
			commit('clearBookmarks');
		},
		fetchLocalBookmarks: ({ commit }) => {
			if (localStorage.getItem('state')) {
				commit('setState', JSON.parse(localStorage.getItem('state')));
			}
		},
		fetchRemoteBookmarks: async ({ commit }, userId) => {
			const bookmarks = await fetchBookmarksForUser(userId);
			commit('clearBookmarks');
			bookmarks.forEach((bookmark) => {
				commit('addBookmark', bookmark);
			});
		},
		syncLocalBookmarks: async ({ getters }, userId) => {
			await Promise.all(
				getters.allBookmarks.map(async (bookmark) => {
					return await createBookmarkForUser(userId, bookmark);
				})
			);
		},
		addBookmark: async ({ state, getters, commit }, data) => {
			const bookmark = initializeBookmark(data);

			commit('addBookmark', bookmark);

			if (getters.isLoggedIn) {
				await createBookmarkForUser(state.users.loggedInUserId, bookmark);
			}
		},
		updateBookmark: async ({ state, getters, commit }, { id, bookmark }) => {
			commit('updateBookmark', { id, bookmark });

			if (getters.isLoggedIn) {
				await updateBookmarkForUser(state.users.loggedInUserId, id, bookmark);
			}
		},
		deleteBookmark: async ({ state, getters, commit }, id) => {
			commit('deleteBookmark', { id });

			if (getters.isLoggedIn) {
				await deleteBookmarkForUser(state.users.loggedInUserId, id);
			}
		},
	},
	mutations: {
		setState(state, newState) {
			this.replaceState(newState);
		},
		setLoggedInUser(state, id) {
			state.users.loggedInUserId = id;
		},
		clearLoggedInUser(state) {
			state.users.loggedInUserId = null;
		},
		addBookmark(state, payload) {
			Vue.set(state.bookmarks.all, payload.id, payload);
		},
		deleteBookmark(state, payload) {
			Vue.delete(state.bookmarks.all, payload.id);
		},
		updateBookmark(state, payload) {
			state.bookmarks.all[payload.id] = {
				...state.bookmarks.all[payload.id],
				...payload.bookmark,
			};
		},
		clearBookmarks(state) {
			state.bookmarks.all = {};
		},
	},
	getters: {
		isLoggedIn: state => {
			return state.users.loggedInUserId !== null;
		},
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
			return getters.activeBookmarks.filter((bookmark) => {
				return bookmark.isFavorite;
			});
		},
		toReadBookmarks: (state, getters) => {
			return getters.activeBookmarks.filter((bookmark) => {
				return bookmark.isToRead;
			});
		},
		tagCount: (state, getters) => {
			return getters.activeBookmarks.reduce((tags, bookmark) => {
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
			return getters.activeBookmarks.filter((bookmark) => {
				return tags.every((tag) => {
					return bookmark.tags.includes(tag);
				});
			});
		},
	},
});

function initializeBookmark(properties = {}) {
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

async function fetchBookmarksForUser(userId) {
	const querySnapshot = await database
		.collection('users').doc(userId)
		.collection('bookmarks').get();

	const bookmarks = [];

	querySnapshot.forEach((doc) => {
		bookmarks.push(doc.data());
	});

	return bookmarks;
}

async function createBookmarkForUser(userId, bookmark) {
	await database
		.collection('users').doc(userId)
		.collection('bookmarks').doc(bookmark.id).set(bookmark);
}

async function updateBookmarkForUser(userId, bookmarkId, bookmark) {
	await database
		.collection('users').doc(userId)
		.collection('bookmarks').doc(bookmarkId).update(bookmark);
}

async function deleteBookmarkForUser(userId, bookmarkId) {
	await database
		.collection('users').doc(userId)
		.collection('bookmarks').doc(bookmarkId).delete();
}
