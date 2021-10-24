<script lang="ts">
	import {
		bookmarks as bookmarkStore,
		createNewBookmark,
		searchBookmarks,
	} from "../store/bookmarks";
	import Page from "./Page.svelte";
	import BookmarkList from "../components/BookmarkList.svelte";
	import SearchBar from "../components/SearchBar.svelte";
	import Select from "../components/form/Select.svelte";
	import type { Bookmark, BookmarksSortedBy } from "../store/bookmarks";
	import type { SortOrder } from "../utils/sorting";
	import { entityBeingEdited } from "../store/ui";

	export let title: string = "";
	export let description: string = "";
	export let bookmarks: Bookmark[];
	export let searchQuery: string = "";
	export let sortedBy: BookmarksSortedBy = "createdAt";
	export let sortOrder: SortOrder = "descending";
	export let actions = [];

	$: bookmarkPageActions = [
		...actions,
		{ label: "New", callback: onClickCreateNewBookmark },
	];

	$: filteredBookmarks = searchBookmarks(bookmarks, searchQuery);

	function onClickCreateNewBookmark() {
		const newBookmark = createNewBookmark();
		bookmarkStore.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<Page actions={bookmarkPageActions}>
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

	<SearchBar bind:query={searchQuery} label="Search here" />

	{#if searchQuery}
		<p>Found {filteredBookmarks.length} bookmarks</p>
	{/if}

	<div class="sorting">
		<label for="sortBookmarks">Sort order:</label>

		<Select
			variant="text"
			options={[
				{ text: "newest first", value: "descending" },
				{ text: "oldest first", value: "ascending" },
			]}
			bind:value={sortOrder}
			id="sortBookmarks"
		/>
	</div>

	<BookmarkList bookmarks={filteredBookmarks} bind:sortOrder bind:sortedBy />
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
