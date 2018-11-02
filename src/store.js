import Vue from 'vue'
import Vuex from 'vuex'
import uuid from './utility/uuid';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        bookmarks: {
            '0': createBookmark({
                id: '0',
                url: 'https://www.youtube.com/watch?v=fgQWnglnGeU',
                title: 'Hexagonal architecture',
                tagIds: ['0', '1'],
            }),
            '1': createBookmark({
                id: '1',
                title: 'Procedural Generation in Game Design',
                isToRead: true,
                tagIds: ['1'],
            }),
        },
        tags: {
            '0': {
                id: '0',
                name: 'talk'
            },
            '1': {
                id: '1',
                name: 'development'
            }
        }
    },
    mutations: {
        addBookmark(state, payload) {
            let newBookmark = createBookmark(payload);
            Vue.set(state.bookmarks, newBookmark.id, newBookmark);
        },
        deleteBookmark(state, payload) {
            Vue.delete(state.bookmarks, payload.id);
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
    actions: {

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
})

function createBookmark(properties) {
    const DEFAULT_BOOKMARK_PROPERTIES = {
        title: '',
        url: '',
        tagIds: [],
        isFavorite: false,
        isArchived: false,
        isToRead: false,
        dateCreated: new Date().valueOf(),
        dateRead: null,
    }
    
    if (!properties.id) {
        properties.id = uuid();
    }

    return {
        ...DEFAULT_BOOKMARK_PROPERTIES,
        ...properties,
    };
}