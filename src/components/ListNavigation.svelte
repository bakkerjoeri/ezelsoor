<script lang="ts">
	import { createNewList, lists as listStore } from "../store/lists";
	import { localStore } from "../store/localStore";
	import NavigationItem from "./NavigationItem.svelte";
	import NavigationSection from "./NavigationSection.svelte";
	import type { List } from "../store/lists";
	import { entityBeingEdited } from "../store/ui";
	import { navigate } from "svelte-routing";

	export let lists: List[] = [];

	let sortedLists = lists.toSorted((a, b) => {
		if (a.title > b.title) {
			return 1;
		}

		if (a.title < b.title) {
			return -1;
		}

		return 0;
	});
	let isCollapsed = localStore("isListNavigationCollapsed", false);
	let actions = [
		{
			label: "create",
			callback: onClickCreate,
		},
	];

	function onClickCreate() {
		const newList = createNewList();
		console.log(newList);
		listStore.add(newList);
		$entityBeingEdited = { type: "list", id: newList.id };
		$isCollapsed = false;
		navigate(`/list/${newList.id}`);
	}
</script>

<NavigationSection
	{actions}
	title="Lists"
	canCollapse={lists.length > 0}
	bind:isCollapsed={$isCollapsed}
>
	{#each sortedLists as list}
		<NavigationItem
			to={`/list/${list.id}`}
			on:navigate
			count={list.showBookmarkCount ? list.bookmarks.length : undefined}
		>
			{#if list.title}
				{list.title}
			{:else}
				New list
			{/if}
		</NavigationItem>
	{/each}
</NavigationSection>
