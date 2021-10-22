<script lang="ts">
	import { navigate } from "svelte-routing";
	import { createNewFilterList, filterLists } from "../store/filters";
	import { createLocalStore } from "../store/localStore";
	import { isLoggedIn } from "../store/session";
	import { doesTagMatchQuery, sortTagCount, tagCount } from "../store/tags";
	import {
		entityBeingEdited,
		showReadLaterCount,
		showTagCount,
		tagSortBy,
	} from "../store/ui";
	import { auth } from "../utils/firebase";
	import { sortObjects } from "../utils/sorting";
	import { bookmarksToRead } from "./../store/bookmarks";
	import ActionRow from "./ActionRow.svelte";
	import Button from "./Button.svelte";
	import InputText from "./form/InputText.svelte";
	import Select from "./form/Select.svelte";
	import NavigationItem from "./NavigationItem.svelte";
	import NavigationLink from "./NavigationLink.svelte";

	let tagSearchQuery: string = "";
	let isTagNavigationVisible = createLocalStore(
		"isTagNavigationVisible",
		true
	);
	let isFilterListNavigationVisible = createLocalStore(
		"isListNavigationVisible",
		true
	);

	$: filterListActions = (() => {
		const actions: Array<{ label: string; callback: () => any }> = [
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

	$: tags = Object.entries($tagCount);
	$: filteredTags = tags.filter(([tagName]) => {
		return doesTagMatchQuery(tagName, tagSearchQuery);
	});
	$: sortedAndFilteredTags = sortTagCount(
		filteredTags,
		$tagSortBy,
		$tagSortBy === "name" ? "ascending" : "descending"
	);
	$: sortedFilterLists = sortObjects($filterLists, "title", "ascending");

	function logout() {
		auth.signOut();
	}

	function toggleTagNavigationVisibility() {
		$isTagNavigationVisible = !$isTagNavigationVisible;
	}

	function toggleFilterListNavigationVisibility() {
		$isFilterListNavigationVisible = !$isFilterListNavigationVisible;
	}

	async function onClickCreateNewFilterList() {
		const newFilterList = createNewFilterList();
		await filterLists.add(newFilterList);
		$entityBeingEdited = { type: "filterList", id: newFilterList.id };
		navigate(`/filter/${newFilterList.id}`);
	}
</script>

<nav>
	{#if !$isLoggedIn}
		<ul class="navigation__list">
			<NavigationItem on:navigate to="/login">Log in</NavigationItem>
			<NavigationItem on:navigate to="/signup">Sign up</NavigationItem>
		</ul>
	{/if}

	<ul class="navigation__list">
		<NavigationItem on:navigate to="/">Home</NavigationItem>
		<NavigationItem
			on:navigate
			to="/toread"
			count={$showReadLaterCount ? $bookmarksToRead.length : undefined}
		>
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

	{#if tags.length > 0}
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
	{/if}

	{#if tags.length > 0 && $isTagNavigationVisible}
		<div class="navigation__search">
			<InputText
				bind:value={tagSearchQuery}
				size="small"
				placeholder="Filter tags"
			/>
		</div>

		<small>
			<label for="tagSort">sort by</label>
			<Select
				id="tagSort"
				size="small"
				variant="text"
				options={[
					{ text: "name", value: "name" },
					{ text: "amount", value: "amount" },
				]}
				bind:value={$tagSortBy}
			/>
		</small>
	{/if}

	{#if sortedAndFilteredTags.length > 0 && $isTagNavigationVisible}
		<ul class="navigation__list">
			{#each sortedAndFilteredTags as [tagName, tagAmount] (tagName)}
				<NavigationItem
					on:navigate
					to={`/tag/${tagName}`}
					count={$showTagCount ? tagAmount : undefined}
				>
					{tagName}
				</NavigationItem>
			{/each}
		</ul>
	{:else if !!tagSearchQuery}
		<p>No tags found.</p>
	{/if}
</nav>

{#if $isLoggedIn}
	<footer class="navigation__footer">
		<NavigationLink to="settings" on:navigate>Settings</NavigationLink>
		<Button on:click={logout} variant="text">Log out</Button>
	</footer>
{/if}

<style lang="scss">
	nav {
		margin: var(--baseline);
	}

	.navigation__list {
		list-style: none;

		&:not(:first-child) {
			margin-top: var(--baseline);
		}
		&:not(:last-child) {
			margin-bottom: var(--baseline);
		}
	}

	.navigation__heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.navigation__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		bottom: 0;
		height: calc(2 * var(--baseline));
		padding-left: var(--baseline);
		padding-right: var(--baseline);
		border-top: 1px solid var(--border-color-ui-secondary);
		background-color: var(--background-color-ui-primary);
	}

	h2 {
		margin-bottom: 0;
	}
</style>
