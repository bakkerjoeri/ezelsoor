<template>
	<div>
		<h2>Favorites</h2>
		<BookmarkList :bookmarks="favoriteBookmarks"></BookmarkList>
	</div>
</template>

<script>
	import BookmarkList from './BookmarkList';

	export default {
		components: {
			BookmarkList,
		},
		computed: {
			favoriteBookmarks() {
				return this.$store.getters.favoriteBookmarks;
			}
		},
	}
</script>
