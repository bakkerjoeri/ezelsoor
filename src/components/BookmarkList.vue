<template>
	<ul class="BookmarkList" v-if="bookmarks.length">
		<BookmarkItem
			class="BookmarkList__item"
			v-for="bookmark in bookmarks"
			:key="bookmark.id"
			:bookmark="bookmark"
		/>
	</ul>
	<div v-else>
		<p class="BookmarkList__empty">No bookmarks here...</p>
	</div>
</template>

<script>
	import BookmarkItem from './BookmarkItem';

	export default {
		props: ['bookmarks'],
		components: {
			BookmarkItem
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
