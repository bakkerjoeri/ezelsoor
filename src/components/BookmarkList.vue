<template>
	<ul class="BookmarkList" v-if="bookmarks.length">
		<BookmarkItem
			class="BookmarkList__item"
			v-for="(bookmark, index) in paginatedBookmarks"
			:key="index"
			:bookmark="bookmark"
		/>
	</ul>
	<Observer
		v-if="bookmarks.length"
		@intersect="loadNextPage"
	/>
	<div v-else>
		<p class="BookmarkList__empty">No bookmarks here...</p>
	</div>
</template>

<script>
	import BookmarkItem from './BookmarkItem';
	import sortBookmarks from './../utility/sortBookmarks.js';
	import Observer from './Observer.vue';

	export default {
		components: {
			BookmarkItem,
			Observer,
		},
		props: {
			bookmarks: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				currentPage: 0,
			};
		},
		computed: {
			sortedBookmarks() {
				return sortBookmarks(this.bookmarks);
			},
			paginatedBookmarks() {
				return this.sortedBookmarks.slice(0, 20 * (this.currentPage + 1));
			},
		},
		methods: {
			loadNextPage() {
				if (this.bookmarks.length > this.paginatedBookmarks.length) {
					this.currentPage = this.currentPage + 1;
				}
			},
		},
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
