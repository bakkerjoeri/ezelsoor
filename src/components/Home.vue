<template>
	<div>
		<h2>Home</h2>
		<BookmarkList :bookmarks="bookmarks"></BookmarkList>
	</div>
</template>

<script>
	import BookmarkList from './BookmarkList';

	export default {
		components: {
			BookmarkList,
		},
		computed: {
			bookmarks() {
				return this.$store.getters.activeBookmarks;
			}
		},
	}
</script>
