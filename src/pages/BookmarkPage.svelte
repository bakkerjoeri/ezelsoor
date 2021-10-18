<script lang="ts">
	import { searchBookmarks } from "../store/bookmarks";
	import Page from "./Page.svelte";
	import BookmarkList from "../components/BookmarkList.svelte";
	import type { Bookmark } from "../store/bookmarks";
	import SearchBar from "../components/SearchBar.svelte";

	export let title: string;
	export let description: string = "";
	export let bookmarks: Bookmark[];
	export let searchQuery: string = "";

	$: filteredBookmarks = searchBookmarks(bookmarks, searchQuery);
</script>

<Page>
	<header>
		<h1>{title}</h1>
		<span>{bookmarks.length} bookmarks</span>
	</header>

	{#if description}
		<p>{description}</p>
	{/if}

	<SearchBar bind:query={searchQuery} />

	{#if searchQuery}
		<p>Found {filteredBookmarks.length} bookmarks</p>
	{/if}

	<BookmarkList bookmarks={filteredBookmarks} />
</Page>

<style lang="scss">
	header {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		margin-bottom: var(--baseline);
	}

	h1 {
		margin-bottom: 0;
		margin-right: 15px;
	}

	span {
		margin-right: 15px;
		color: var(--color-text-soft);
	}
</style>
