<script lang="ts">
	import type { Bookmark } from "./../store/bookmarks.js";
	import BookmarkItem from "./BookmarkItem.svelte";
	import Observer from "./Observer.svelte";

	type SortingMethod = "date";
	export let bookmarks: Bookmark[] = [];
	export let sortedBy: SortingMethod = "date";
	export let lazyLoad: boolean = true;
	export let pageSize = 40;

	let currentPage = 1;

	$: loadMoreMargin = Math.ceil(pageSize / 4);
	$: amountToShow = pageSize * currentPage;
	$: positionOfObserver = amountToShow - loadMoreMargin;

	$: sortedBookmarks = (() => {
		if (sortedBy === "date") {
			return [...bookmarks].sort((a, b) => b.createdAt - a.createdAt);
		}

		return bookmarks;
	})();

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
