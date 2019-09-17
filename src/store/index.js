import Vue from 'vue'
import Vuex from 'vuex'
import uuid from './../utility/uuid.js';

Vue.use(Vuex)

export const DEFAULT_BOOKMARK_PROPERTIES = {
	url: '',
	title: '',
	summary: '',
	tagIds: [],
	isFavorite: false,
	isArchived: false,
	isToRead: false,
	dateRead: null,
};

export default new Vuex.Store({
	state: {
		bookmarks: {
			'0': createBookmark({
				id: '0',
				url: 'https://www.youtube.com/watch?v=fgQWnglnGeU',
				title: 'Hexagonal architecture',
				tags: ['talk', 'development'],
			}),
			'1': createBookmark({
				id: '1',
				title: 'Procedural Generation in Game Design',
				isToRead: true,
				tags: ['development'],
			}),
			'2': createBookmark({
				id: '2',
				url: 'https://www.youtube.com/watch?v=5y_IAdOwaYs',
				title: 'Nethack: Text Tourist Mode',
				isToRead: true,
				isFavorite: true,
				tags: ['talk', 'gamedevelopment'],
			}),
		},
	},
	mutations: {
		addBookmark(state, payload) {
			let newBookmark = createBookmark(payload);
			Vue.set(state.bookmarks, newBookmark.id, newBookmark);
		},
		deleteBookmark(state, payload) {
			Vue.delete(state.bookmarks, payload.id);
		},
		updateBookmark(state, payload) {
			state.bookmarks[payload.id] = {
				...state.bookmarks[payload.id],
				...payload,
			};
		},
		setBookmarkIsToRead(state, payload) {
			Vue.set(state.bookmarks[payload.id], 'isToRead', payload.isToRead);
		},
		setBookmarkIsFavorite(state, payload) {
			Vue.set(state.bookmarks[payload.id], 'isFavorite', payload.isFavorite);
		},
		setBookmarkIsArchived(state, payload) {
			Vue.set(state.bookmarks[payload.id], 'isArchived', payload.isArchived);
		},
	},
	getters: {
		allBookmarks: state => {
			return Object.values(state.bookmarks);
		},
		bookmarkWithId: (state) => bookmarkId => {
			return state.bookmarks[bookmarkId];
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
		tagsOfBookmarkWithId: (state, getters) => bookmarkId => {
			return getters.bookmarkWithId(bookmarkId).tagIds.map((tagId) => {
				return getters.tagWithId(tagId);
			});
		},
		allTags: state => {
			return Object.values(state.tags);
		},
		tagWithId: (state) => (tagId) => {
			return state.tags[tagId];
		},
		tagWithName: (state, getters) => name => {
			return getters.allTags.find((tag) => {
				return tag.name === name;
			});
		},
		bookmarksWithTagIds: (state, getters) => tagIds => {
			return getters.allBookmarks.filter((bookmark) => {
				return tagIds.every((tagId) => {
					return bookmark.tagIds.includes(tagId);
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
