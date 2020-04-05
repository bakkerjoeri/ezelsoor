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

export const DEFAULT_LIST_PROPERTIES = {
	title: '',
	description: '',
	shouldIncludeArchived: false,
	filters: [],
}

export default new Vuex.Store({
	state: {
		hasFetchedData: false,
		bookmarks: {
			all: {},
		},
		users: {
			all: {},
			loggedInUserId: null,
		},
		lists: {
			all: {},
		},
	},
	actions: {
		login: async ({ dispatch, commit }, userId) => {
			commit('setLoggedInUser', userId);
			await dispatch('syncLocalBookmarks', userId);
			await dispatch('fetchRemoteState', userId);
		},
		logout: ({ commit }) => {
			commit('clearLoggedInUser');
			commit('clearBookmarks');
		},
		fetchLocalState: ({ commit }) => {
			if (localStorage.getItem('state')) {
				commit('setState', JSON.parse(localStorage.getItem('state')));
			}

			commit('finishFirstFetch');
		},
		fetchRemoteState: async ({ dispatch, commit }, userId) => {
			await dispatch('fetchRemoteBookmarks', userId);
			await dispatch('fetchRemoteLists', userId);

			commit('finishFirstFetch');
		},
		fetchRemoteBookmarks: async ({ commit }, userId) => {
			const bookmarks = await fetchBookmarksForUser(userId);
			commit('clearBookmarks');
			bookmarks.forEach((bookmark) => {
				commit('addBookmark', bookmark);
			});
		},
		fetchRemoteLists: async ({ commit }, userId) => {
			const lists = await fetchListsForUser(userId);
			commit('clearLists');
			lists.forEach((bookmark) => {
				commit('addList', bookmark);
			});
		},
		syncLocalBookmarks: async ({ getters }, userId) => {
			return await Promise.all(
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
		addList: async ({state, getters, commit }, data) => {
			const list = initializeList(data);

			commit('addList', list);

			if (getters.isLoggedIn) {
				await createListForUser(state.users.loggedInUserId, list);
			}
		},
		updateList: async ({ state, getters, commit }, { id, list }) => {
			commit('updateList', { id, list });

			if (getters.isLoggedIn) {
				await updateListForUser(state.users.loggedInUserId, id, list);
			}
		},
		deleteList: async ({ state, getters, commit }, id) => {
			commit('deleteList', { id });

			if (getters.isLoggedIn) {
				await deleteListForUser(state.users.loggedInUserId, id);
			}
		},
	},
	mutations: {
		setState(state, newState) {
			this.replaceState(newState);
		},
		finishFirstFetch(state) {
			state.hasFetchedData = true;
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
		addList(state, payload) {
			Vue.set(state.lists.all, payload.id, payload);
		},
		deleteList(state, payload) {
			Vue.delete(state.lists.all, payload.id);
		},
		updateList(state, payload) {
			state.lists.all[payload.id] = {
				...state.lists.all[payload.id],
				...payload.list,
			};
		},
		clearLists(state) {
			state.lists.all = {};
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
			if (!state.bookmarks.all.hasOwnProperty(bookmarkId)) {
				throw new Error(`Couldn't find bookmark with ID ${bookmarkId}.`);
			}

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
		allLists: state => {
			return Object.values(state.lists.all);
		},
		listWithId: state => listId => {
			if (!state.lists.all.hasOwnProperty(listId)) {
				throw new Error(`Couldn't find list with ID ${listId}.`);
			}

			return state.lists.all[listId];
		},
		hasListWithId: state => listId => {
			return state.lists.all.hasOwnProperty(listId);
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

function initializeList(properties = {}) {
	if (!properties.id) {
		properties.id = uuid();
	}

	if (!properties.dateCreated) {
		properties.dateCreated = new Date().valueOf();
	}

	return {
		...DEFAULT_LIST_PROPERTIES,
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

async function fetchListsForUser(userId) {
	const querySnapshot = await database
		.collection('users').doc(userId)
		.collection('lists').get();

	const lists = [];

	querySnapshot.forEach((doc) => {
		lists.push(doc.data());
	});

	return lists;
}

async function createListForUser(userId, list) {
	await database
		.collection('users').doc(userId)
		.collection('lists').doc(list.id).set(list);
}

async function updateListForUser(userId, listId, list) {
	await database
		.collection('users').doc(userId)
		.collection('lists').doc(listId).update(list);
}

async function deleteListForUser(userId, listId) {
	await database
		.collection('users').doc(userId)
		.collection('lists').doc(listId).delete();
}
