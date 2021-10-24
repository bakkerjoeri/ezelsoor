<script lang="ts">
	import { localStore } from "../store/localStore";
	import { doesTagMatchQuery, sortTagCount } from "../store/tags";
	import { showTagCount, tagSortBy } from "../store/ui";
	import InputText from "./form/InputText.svelte";
	import Select from "./form/Select.svelte";
	import NavigationItem from "./NavigationItem.svelte";
	import NavigationSection from "./NavigationSection.svelte";
	import SearchBar from "./SearchBar.svelte";

	export let tags: Array<[tagName: string, count: number]> = [];

	let tagSearchQuery: string = "";
	let isCollapsed = localStore("isTagNavigationCollapsed", false);

	$: filteredTags = tags.filter(([tagName]) =>
		doesTagMatchQuery(tagName, tagSearchQuery)
	);
	$: sortedAndFilteredTags = sortTagCount(
		filteredTags,
		$tagSortBy,
		$tagSortBy === "name" ? "ascending" : "descending"
	);
</script>

<NavigationSection
	title="Tags"
	canCollapse={tags.length > 0}
	bind:isCollapsed={$isCollapsed}
>
	<div slot="before">
		{#if tags.length > 0 && !$isCollapsed}
			<small class="sort">
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

			<div class="search">
				<SearchBar
					bind:query={tagSearchQuery}
					label="Filter tags"
					size="small"
				/>
			</div>
		{/if}
	</div>

	{#each sortedAndFilteredTags as [tagName, tagAmount] (tagName)}
		<NavigationItem
			on:navigate
			to={`/tag/${tagName}`}
			count={$showTagCount ? tagAmount : undefined}
		>
			{tagName}
		</NavigationItem>
	{:else}
		{#if !!tagSearchQuery}
			<p>No tags found.</p>
		{/if}
	{/each}
</NavigationSection>

<style lang="scss">
	.sort {
		display: block;
		height: var(--baseline);
	}

	.search {
		margin-top: calc(var(--baseline) / 2);
		margin-bottom: calc(var(--baseline) / 2);
	}
</style>
