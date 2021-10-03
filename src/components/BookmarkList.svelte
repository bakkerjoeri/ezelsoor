<script lang="ts">
	import type { Bookmark } from "./../store/bookmarks.js";
	import BookmarkItem from "./BookmarkItem.svelte";

	type SortingMethod = "date";
	export let bookmarks: Bookmark[] = [];
	export let sortedBy: SortingMethod = "date";

	$: sortedBookmarks = (() => {
		if (sortedBy === "date") {
			return [...bookmarks].sort((a, b) => b.dateCreated - a.dateCreated);
		}

		return bookmarks;
	})();
</script>

<ul>
	{#each sortedBookmarks as bookmark (bookmark.id)}
		<li>
			<BookmarkItem {bookmark} />
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 0;
		margin: 0;
	}

	li + li {
		margin-top: 26px;
	}
</style>
