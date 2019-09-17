<template>
	<div>
		<h2>Read later</h2>
		<BookmarkList :bookmarks="toReadBookmarks"></BookmarkList>
	</div>
</template>

<script>
	import BookmarkList from './BookmarkList';

	export default {
		components: {
			BookmarkList,
		},
		computed: {
			toReadBookmarks() {
				return this.$store.getters.toReadBookmarks;
			},
		},
	}
</script>
