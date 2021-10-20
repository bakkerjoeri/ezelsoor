<script lang="ts">
	import { searchBookmarks } from "../store/bookmarks";
	import Page from "./Page.svelte";
	import BookmarkList from "../components/BookmarkList.svelte";
	import type { Bookmark } from "../store/bookmarks";
	import SearchBar from "../components/SearchBar.svelte";
	import Select from "../components/form/Select.svelte";

	export let title: string = "";
	export let description: string = "";
	export let bookmarks: Bookmark[];
	export let searchQuery: string = "";

	let sortedBy: "createdAt" = "createdAt";
	let sortOrder: "ascending" | "descending" = "descending";

	$: filteredBookmarks = searchBookmarks(bookmarks, searchQuery);
</script>

<Page>
	<header>
		{#if $$slots.title}
			<h1><slot name="title" /></h1>
		{:else if title}
			<h1>{title}</h1>
		{/if}

		<span>{bookmarks.length} bookmarks</span>

		{#if $$slots.actions}
			<slot name="actions" />
		{/if}
	</header>

	{#if description}
		<p>{description}</p>
	{/if}

	<SearchBar bind:query={searchQuery} />

	{#if searchQuery}
		<p>Found {filteredBookmarks.length} bookmarks</p>
	{/if}

	<div class="sorting">
		<label for="sort-bookmarks">Sort </label>

		<Select
			variant="text"
			options={[
				{ text: "newest first", value: "descending" },
				{ text: "oldest first", value: "ascending" },
			]}
			bind:value={sortOrder}
			id="sort-bookmarks"
		/>
	</div>

	<BookmarkList bookmarks={filteredBookmarks} {sortOrder} {sortedBy} />
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

	.sorting {
		margin-bottom: var(--baseline);
	}
</style>
