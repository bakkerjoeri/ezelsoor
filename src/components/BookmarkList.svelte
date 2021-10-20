<script lang="ts">
	import { sortObjects } from "../utils/sorting.js";
	import BookmarkItem from "./BookmarkItem.svelte";
	import Observer from "./Observer.svelte";
	import type { SortOrder } from "../utils/sorting.js";
	import type { Bookmark, BookmarksSortedBy } from "./../store/bookmarks.js";

	export let bookmarks: Bookmark[] = [];
	export let sortedBy: BookmarksSortedBy = "createdAt";
	export let sortOrder: SortOrder = "descending";
	export let lazyLoad: boolean = true;
	export let pageSize = 40;

	let currentPage = 1;

	$: loadMoreMargin = Math.ceil(pageSize / 4);
	$: amountToShow = pageSize * currentPage;
	$: positionOfObserver = amountToShow - loadMoreMargin;
	$: sortedBookmarks = sortObjects(bookmarks, sortedBy, sortOrder);

	$: visibleBookmarks = (() => {
		if (!lazyLoad) {
			return sortedBookmarks;
		}

		return sortedBookmarks.slice(0, amountToShow);
	})();

	function loadMore() {
		currentPage += 1;
	}
</script>

<ul>
	{#each visibleBookmarks as bookmark, index (bookmark.id)}
		<li>
			<BookmarkItem {bookmark} />
		</li>

		{#if index + 1 === positionOfObserver}
			<Observer on:intersect={loadMore} />
		{/if}
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 0;
		margin: 0;
	}

	li + li {
		margin-top: var(--baseline);
	}
</style>
