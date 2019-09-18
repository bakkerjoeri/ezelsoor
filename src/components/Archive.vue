<template>
	<div>
		<h2>Archive</h2>
		<BookmarkList :bookmarks="archivedBookmarks"/>
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
			archivedBookmarks() {
				return sortBookmarks(this.$store.getters.archivedBookmarks);
			},
		},
	}
</script>
