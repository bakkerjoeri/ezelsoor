<script lang="ts">
	import type { Bookmark } from "./../store/bookmarks.js";
	import BookmarkItem from "./BookmarkItem.svelte";
	import Observer from "./Observer.svelte";

	export let bookmarks: Bookmark[] = [];
	export let sortedBy: "createdAt" = "createdAt";
	export let sortOrder: "ascending" | "descending" = "descending";
	export let lazyLoad: boolean = true;
	export let pageSize = 40;

	let currentPage = 1;

	$: loadMoreMargin = Math.ceil(pageSize / 4);
	$: amountToShow = pageSize * currentPage;
	$: positionOfObserver = amountToShow - loadMoreMargin;

	$: sortFactor = sortOrder === "ascending" ? 1 : -1;
	$: sortedBookmarks = (() => {
		return [...bookmarks].sort((a, b) => {
			if (a[sortedBy] > b[sortedBy]) {
				return sortFactor;
			}

			if (a[sortedBy] < b[sortedBy]) {
				return sortFactor * -1;
			}

			return 0;
		});
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
