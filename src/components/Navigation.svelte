<script lang="ts">
	import { navigate } from "svelte-routing";

	import { lists, createNewList } from "../store/lists";
	import { createLocalStore } from "../store/localStore";
	import { isLoggedIn } from "../store/session";
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

	let isListNavigationVisible = createLocalStore(
		"isListNavigationVisible",
		true
	);

	$: listActions = (() => {
		const actions = [
			{
				label: "create",
				callback: onClickCreateNewList,
			},
		];

		if (sortedLists.length > 0) {
			actions.push({
				label: $isListNavigationVisible ? "hide" : "show",
				callback: toggleListNavigationVisibility,
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

	$: sortedLists = (() => {
		if (listsSortedBy === "alphabetically") {
			return [...$lists].sort((a, b) => {
				if (a.title > b.title) {
					return 1;
				}

				if (a.title < b.title) {
					return -1;
				}

				return 0;
			});
		}

		return $lists;
	})();

	function toggleTagNavigationVisibility() {
		$isTagNavigationVisible = !$isTagNavigationVisible;
	}

	function toggleListNavigationVisibility() {
		$isListNavigationVisible = !$isListNavigationVisible;
	}

	function onClickCreateNewList() {
		const newList = createNewList();
		$lists = [...$lists, newList];
		$entityBeingEdited = { type: "list", id: newList.id };
		navigate(`/list/${newList.id}`);
	}
</script>

<ul class="navigation__list">
	{#if !$isLoggedIn}
		<NavigationItem to="/login">Log in</NavigationItem>
	{/if}

	<NavigationItem to="/">Home</NavigationItem>
	<NavigationItem to="/toread" count={$bookmarksToRead.length}
		>Read later</NavigationItem
	>
	<NavigationItem to="/favorites">Favorites</NavigationItem>
	<NavigationItem to="/archive">Archive</NavigationItem>
</ul>

<header class="navigation__heading">
	<h2>Lists</h2>

	<ActionRow actions={listActions} />
</header>

{#if $isListNavigationVisible && sortedLists.length > 0}
	<ul class="navigation__list">
		{#each sortedLists as list (list.id)}
			<NavigationItem to={`/list/${list.id}`}>
				{#if list.title}
					{list.title}
				{:else}
					New list
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
				<NavigationItem to={`/tag/${tagName}`} count={tagAmount}>
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
