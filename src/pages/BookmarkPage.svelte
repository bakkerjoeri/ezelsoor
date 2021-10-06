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
	<h1>{title}</h1>

	{#if description}
		<p>{description}</p>
	{/if}

	<SearchBar bind:query={searchQuery} />

	{#if searchQuery}
		<p>Found {filteredBookmarks.length} bookmarks</p>
	{/if}

	<BookmarkList bookmarks={filteredBookmarks} />
</Page>
