<template>
	<div>
		<h2>Home</h2>
		<BookmarkList :bookmarks="bookmarks"></BookmarkList>
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
			bookmarks() {
				return sortBookmarks(this.$store.getters.activeBookmarks);
			}
		},
	}
</script>
