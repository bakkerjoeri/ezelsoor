<template>
	<div>
		<h2>Favorites</h2>
		<BookmarkList :bookmarks="favoriteBookmarks"></BookmarkList>
	</div>
</template>

<script>
	import BookmarkList from './BookmarkList';
	import sortBookmarks from './../utility/sortBookmarks.js';

	export default {
		components: {
			BookmarkList,
		},
		computed: {
			favoriteBookmarks() {
				return sortBookmarks(this.$store.getters.favoriteBookmarks);
			}
		},
	}
</script>
