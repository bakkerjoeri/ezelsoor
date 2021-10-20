<script lang="ts">
	import { filterBookmarks, filterLists } from "../store/filters";
	import { entityBeingEdited } from "../store/ui";
	import {
		bookmarks as allBookmarks,
		activeBookmarks,
	} from "../store/bookmarks";
	import { createLocalStore } from "../store/localStore";
	import Button from "../components/Button.svelte";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { FilterList } from "../store/filters";
	import type { SortOrder } from "../utils/sorting";

	export let filterListId: FilterList["id"];

	$: filterList = $filterLists.find((value) => value.id === filterListId);
	$: bookmarksToFilter = filterList.shouldIncludeArchived
		? $allBookmarks
		: $activeBookmarks;
	$: bookmarks = filterBookmarks(bookmarksToFilter, filterList.filters);
	$: sortOrder = createLocalStore<SortOrder>(
		`filterList-${filterListId}-sortOrder`,
		"descending"
	);

	function onClickEditFilterList() {
		$entityBeingEdited = {
			type: "filterList",
			id: filterList.id,
		};
	}
</script>

<BookmarkPage {bookmarks} bind:sortOrder={$sortOrder}>
	<span slot="title">
		{#if filterList.title}
			{filterList.title}
		{:else}
			<span class="placeholder">New filter</span>
		{/if}
	</span>

	<div slot="actions">
		<Button on:click={onClickEditFilterList} variant="text">edit</Button>
	</div>
</BookmarkPage>

<style lang="scss">
	.placeholder {
		color: var(--color-text-soft);
		font-weight: normal;
	}
</style>
