import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store';
import filterBookmarks from './utility/filterBookmarks.js';
import BookmarkCollectionView from './components/BookmarkCollectionView.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';

const routes = [
	{
		path: '/',
		component: BookmarkCollectionView,
		props: () => ({
			title: 'Bookmarks',
			bookmarks: store.getters.activeBookmarks,
		}),
	},
	{
		path: '/signup',
		component: Signup,
		meta: {
			requiresNoAuth: true,
		},
	},
	{
		path: '/login',
		component: Login,
		meta: {
			requiresNoAuth: true,
		},
	},
	{
		path: '/favorites',
		component: BookmarkCollectionView,
		props: () => ({
			title: 'Favorites',
			bookmarks: store.getters.favoriteBookmarks,
		}),
	},
	{
		path: '/toread',
		component: BookmarkCollectionView,
		props: () => ({
			title: 'Read later',
			bookmarks: store.getters.toReadBookmarks,
		}),
	},
	{
		path: '/archive',
		component: BookmarkCollectionView,
		props: () => ({
			title: 'Archive',
			bookmarks: store.getters.archivedBookmarks,
		}),
	},
	{
		path: '/list/:listId',
		component: BookmarkCollectionView,
		name: 'list',
		props: (route) => {
			const list = store.getters.listWithId(route.params.listId);
			const bookmarks = list.shouldIncludeArchived ? store.getters.allBookmarks : store.getters.activeBookmarks;

			return {
				title: list.title,
				bookmarks: filterBookmarks(bookmarks, list.filters),
			};
		},
		beforeEnter: (to, from, next) => {
			if (store.state.hasFetchedData) {
				if (store.getters.hasListWithId(to.params.listId)) {
					return next();
				}

				if (from) {
					return next(from.path);
				}

				return next('/');
			}

			const unwatch = store.watch(state => state.hasFetchedData, hasFetchedData => {
				if (hasFetchedData) {
					unwatch();

					if (store.getters.hasListWithId(to.params.listId)) {
						return next();
					}

					if (from) {
						return next(from.path);
					}

					return next('/');
				}
			});
		}
	},
	{
		path: '/tag/:tagName',
		component: BookmarkCollectionView,
		name: 'tag',
		props: (route) => ({
			title: `#${route.params.tagName}`,
			tagName: route.params.tagName,
			bookmarks: store.getters.bookmarksWithTags([route.params.tagName]),
		}),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresNoAuth)) {
		if (store.getters.isLoggedIn) {
			if (from) {
				return next(from.path);
			}

			return next('/');
		}
	}

	return next();
});

export default router;
