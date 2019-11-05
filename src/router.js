import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import BookmarkCollectionView from './components/BookmarkCollectionView';

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
		path: '/favorites',
		component: BookmarkCollectionView,
		props: () => ({
			title: 'Favorites',
			bookmarks: store.getters.archivedBookmarks,
		}),
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
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
