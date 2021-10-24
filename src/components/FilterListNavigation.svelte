<script lang="ts">
	import { navigate } from "svelte-routing";
	import {
		createNewFilterList,
		filterBookmarks,
		filterLists as filterListStore,
	} from "../store/filters";
	import { entityBeingEdited } from "../store/ui";
	import { localStore } from "../store/localStore";
	import { activeBookmarks, bookmarks } from "../store/bookmarks";
	import { sortObjects } from "../utils/sorting";
	import NavigationItem from "./NavigationItem.svelte";
	import type { FilterList } from "../store/filters";
	import NavigationSection from "./NavigationSection.svelte";

	export let filterLists: FilterList[];

	let isCollapsed = localStore("isFilterListNavigationCollapsed", false);
	let actions = [
		{
			label: "create",
			callback: onClickCreateNewFilterList,
		},
	];

	$: sortedFilterLists = sortObjects(filterLists, "title", "ascending");

	function onClickCreateNewFilterList() {
		const newFilterList = createNewFilterList();
		filterListStore.add(newFilterList);
		$entityBeingEdited = { type: "filterList", id: newFilterList.id };
		$isCollapsed = false;
		navigate(`/filter/${newFilterList.id}`);
	}
</script>

<NavigationSection
	bind:isCollapsed={$isCollapsed}
	{actions}
	canCollapse={sortedFilterLists.length > 0}
	title="Filters"
>
	{#if sortedFilterLists.length > 0}
		{#each sortedFilterLists as filterList (filterList.id)}
			<NavigationItem
				on:navigate
				to={`/filter/${filterList.id}`}
				count={filterList.showBookmarkCount
					? filterBookmarks(
							filterList.shouldIncludeArchived
								? $bookmarks
								: $activeBookmarks,
							filterList.filters
					  ).length
					: undefined}
			>
				{#if filterList.title}
					{filterList.title}
				{:else}
					New filter
				{/if}
			</NavigationItem>
		{/each}
	{/if}
</NavigationSection>
