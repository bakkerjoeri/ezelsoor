<template>
	<div>
		<h2>Archive</h2>
		<BookmarkList :bookmarks="archivedBookmarks"/>
	</div>
</template>

<script>
	import BookmarkList from './BookmarkList';

	export default {
		components: {
			BookmarkList,
		},
		computed: {
			archivedBookmarks() {
				return this.$store.getters.archivedBookmarks;
			},
		},
	}
</script>
