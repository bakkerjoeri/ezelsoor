<template>
	<div>
		<h2>Tagged with: {{ tagName }}</h2>
		<BookmarkList :bookmarks="getBookmarksWithTagName(tagName)"></BookmarkList>
	</div>
</template>

<script>
	import BookmarkList from './BookmarkList';

	export default {
		props: ['tagName'],
		components: {
			BookmarkList,
		},
		methods: {
			getBookmarksWithTagName(tagName) {
				return this.$store.getters.bookmarksWithTags([tagName]);
			},
		},
	};
</script>
