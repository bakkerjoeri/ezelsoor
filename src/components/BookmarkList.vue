<template>
	<ul class="BookmarkList">
		<BookmarkItem
			class="BookmarkList__item"
			v-for="bookmark in bookmarks"
			:key="bookmark.id"
			:bookmark="bookmark"
		/>
	</ul>
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
</style>
