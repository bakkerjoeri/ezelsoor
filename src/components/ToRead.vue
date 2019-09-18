<template>
	<div>
		<h2>Read later</h2>
		<BookmarkList :bookmarks="toReadBookmarks"></BookmarkList>
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
			toReadBookmarks() {
				return sortBookmarks(this.$store.getters.toReadBookmarks);
			},
		},
	}
</script>
