import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import filterBookmarks from './utility/filterBookmarks.js';
import BookmarkCollectionView from './components/BookmarkCollectionView.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';

Vue.use(VueRouter);

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
			title: 'Archived',
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

const router = new VueRouter({
	mode: 'history',
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
