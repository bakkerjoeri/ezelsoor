<script lang="ts">
	import { navigate } from "svelte-routing";
	import { createNewFilterList, filterLists } from "../store/filters";
	import { lists, createNewList } from "../store/lists";
	import { createLocalStore } from "../store/localStore";
	import { entityBeingEdited } from "../store/ui";
	import { bookmarksToRead, tagCount } from "./../store/bookmarks";
	import ActionRow from "./ActionRow.svelte";
	import NavigationItem from "./NavigationItem.svelte";

	type ListSortingMethod = "alphabetically" | "bookmarkCount";
	type TagSortingMethod = "alphabetically" | "bookmarkCount";

	let listsSortedBy: ListSortingMethod = "alphabetically";
	let tagsSortedBy: TagSortingMethod = "bookmarkCount";

	let isTagNavigationVisible = createLocalStore(
		"isTagNavigationVisible",
		true
	);

	let isFilterListNavigationVisible = createLocalStore(
		"isListNavigationVisible",
		true
	);

	$: filterListActions = (() => {
		const actions = [
			{
				label: "create",
				callback: onClickCreateNewFilterList,
			},
		];

		if (sortedFilterLists.length > 0) {
			actions.push({
				label: $isFilterListNavigationVisible ? "hide" : "show",
				callback: toggleFilterListNavigationVisibility,
			});
		}

		return actions;
	})();

	$: sortedTags = (() => {
		const tags = Object.entries($tagCount);
		if (tagsSortedBy === "alphabetically") {
			return tags.sort(([tagNameA], [tagNameB]) => {
				if (tagNameA > tagNameB) {
					return 1;
				}

				if (tagNameA < tagNameB) {
					return -1;
				}

				return 0;
			});
		}

		if (tagsSortedBy === "bookmarkCount") {
			return tags.sort(
				([tagNameA, bookmarkCountA], [tagNameB, bookmarkCountB]) => {
					if (bookmarkCountB > bookmarkCountA) {
						return 1;
					}

					if (bookmarkCountB < bookmarkCountA) {
						return -1;
					}

					if (tagNameA > tagNameB) {
						return 1;
					}

					if (tagNameA < tagNameB) {
						return -1;
					}

					return 0;
				}
			);
		}

		return tags;
	})();

	$: sortedFilterLists = (() => {
		if (listsSortedBy === "alphabetically") {
			return [...$filterLists].sort((a, b) => {
				if (a.title > b.title) {
					return 1;
				}

				if (a.title < b.title) {
					return -1;
				}

				return 0;
			});
		}

		return $filterLists;
	})();

	function toggleTagNavigationVisibility() {
		$isTagNavigationVisible = !$isTagNavigationVisible;
	}

	function toggleFilterListNavigationVisibility() {
		$isFilterListNavigationVisible = !$isFilterListNavigationVisible;
	}

	function onClickCreateNewFilterList() {
		const newFilterList = createNewFilterList();
		filterLists.add(newFilterList);
		$entityBeingEdited = { type: "filterList", id: newFilterList.id };
		navigate(`/filter/${newFilterList.id}`);
	}
</script>

<ul class="navigation__list">
	<NavigationItem on:navigate to="/">Home</NavigationItem>
	<NavigationItem on:navigate to="/toread" count={$bookmarksToRead.length}>
		Read later
	</NavigationItem>
	<NavigationItem on:navigate to="/favorites">Favorites</NavigationItem>
	<NavigationItem on:navigate to="/archive">Archive</NavigationItem>
</ul>

<header class="navigation__heading">
	<h2>Filters</h2>

	<ActionRow actions={filterListActions} />
</header>

{#if $isFilterListNavigationVisible && sortedFilterLists.length > 0}
	<ul class="navigation__list">
		{#each sortedFilterLists as filterList (filterList.id)}
			<NavigationItem on:navigate to={`/filter/${filterList.id}`}>
				{#if filterList.title}
					{filterList.title}
				{:else}
					New filter
				{/if}
			</NavigationItem>
		{/each}
	</ul>
{/if}

{#if sortedTags.length > 0}
	<header class="navigation__heading">
		<h2>Tags</h2>

		<ActionRow
			actions={[
				{
					label: $isTagNavigationVisible ? "hide" : "show",
					callback: toggleTagNavigationVisibility,
				},
			]}
		/>
	</header>

	{#if $isTagNavigationVisible}
		<ul class="navigation__list">
			{#each sortedTags as [tagName, tagAmount] (tagName)}
				<NavigationItem
					on:navigate
					to={`/tag/${tagName}`}
					count={tagAmount}
				>
					{tagName}
				</NavigationItem>
			{/each}
		</ul>
	{/if}
{/if}

<style lang="scss">
	.navigation__list {
		&:not(:last-child) {
			margin-bottom: var(--baseline);
		}
	}

	.navigation__heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
