<script lang="ts">
	import { filterBookmarks, filterLists } from "../store/filters";
	import { entityBeingEdited } from "../store/ui";
	import {
		bookmarks as allBookmarks,
		activeBookmarks,
		searchBookmarks,
	} from "../store/bookmarks";
	import Page from "./Page.svelte";
	import BookmarkList from "../components/BookmarkList.svelte";
	import SearchBar from "../components/SearchBar.svelte";
	import Button from "../components/Button.svelte";
	import type { FilterList } from "../store/filters";
	import type { Bookmark } from "../store/bookmarks";

	export let filterListId: FilterList["id"];

	let bookmarks: Bookmark[];
	let searchQuery: string = "";

	$: filterList = $filterLists.find((value) => {
		return value.id === filterListId;
	});
	$: bookmarksToFilter = filterList.shouldIncludeArchived
		? $allBookmarks
		: $activeBookmarks;

	$: bookmarks = filterBookmarks(bookmarksToFilter, filterList.filters);
	$: filteredBookmarks = searchBookmarks(bookmarks, searchQuery);

	function onClickEditFilterList() {
		$entityBeingEdited = {
			type: "filterList",
			id: filterList.id,
		};
	}
</script>

<Page>
	<header>
		<h1>
			{#if filterList.title}
				{filterList.title}
			{:else}
				<span class="placeholder">New filter</span>
			{/if}
		</h1>
		<Button on:click={onClickEditFilterList} variant="text">edit</Button>
	</header>

	{#if filterList.description}
		<p>{filterList.description}</p>
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
	}

	.placeholder {
		color: var(--color-text-soft);
	}

	h1 {
		margin-right: 15px;
	}
</style>
