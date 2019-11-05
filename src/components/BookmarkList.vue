<template>
	<ul class="BookmarkList" v-if="bookmarks.length">
		<BookmarkItem
			class="BookmarkList__item"
			v-for="(bookmark, index) in sortedBookmarks"
			:key="index"
			:bookmark="bookmark"
		/>
	</ul>
	<div v-else>
		<p class="BookmarkList__empty">No bookmarks here...</p>
	</div>
</template>

<script>
	import BookmarkItem from './BookmarkItem';
	import sortBookmarks from './../utility/sortBookmarks.js';

	export default {
		components: {
			BookmarkItem
		},
		props: {
			bookmarks: {
				type: Array,
				default: () => [],
			},
		},
		computed: {
			sortedBookmarks() {
				return sortBookmarks(this.bookmarks);
			}
		}
	};
</script>

<style lang="scss">
	.BookmarkList {
		list-style: none;
	}

	.BookmarkList__empty {
		font-style: italic;
		color: gray;
	}
</style>
