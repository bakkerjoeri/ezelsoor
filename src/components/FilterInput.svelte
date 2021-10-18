<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "./Button.svelte";
	import { filterTypesWithValue } from "../store/filters";
	import type { FilterType } from "../store/filters";

	const dispatch = createEventDispatcher<{ delete: undefined }>();

	export let type: FilterType | null = null;
	export let value: string = "";

	const filterOptions: Array<{
		text: string;
		value: FilterType;
	}> = [
		{ text: "Matches search", value: "matchesSearchTerms" },
		{ text: "Has source", value: "hasSource" },
		{ text: "From source", value: "fromSource" },
		{ text: "Favorite", value: "isFavorite" },
		{ text: "Read later", value: "isToRead" },
		{ text: "Archived", value: "isArchived" },
		{ text: "Tagged with all of", value: "andTags" },
		{ text: "Tagged with any of", value: "orTags" },
		{ text: "Untagged", value: "untagged" },
	];
</script>

<div class="filter-input" class:has-value={filterTypesWithValue.includes(type)}>
	<select bind:value={type} class="filter-input__type">
		<option disabled value={null}>Select a filter type</option>

		{#each filterOptions as filterOption}
			<option value={filterOption.value}>
				{filterOption.text}
			</option>
		{/each}
	</select>

	{#if filterTypesWithValue.includes(type)}
		<input type="text" bind:value class="filter-input__value" />
	{/if}

	<div class="filter-input__actions">
		<Button
			aria-label="Remove filter"
			size="small"
			variant="outline"
			on:click={() => {
				dispatch("delete");
			}}
		>
			-
		</Button>
	</div>
</div>

<style lang="scss">
	.filter-input {
		display: grid;
		grid-template-columns: minmax(50%, 1fr) 1fr min-content;
	}

	.filter-input__type {
		position: relative;
		grid-column: 1 / 3;
		appearance: none;
		padding: 12px;
		width: 100%;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		color: var(--color-text);
		border: 1px solid var(--border-color-ui-secondary);
		background-color: var(--background-color-ui-secondary);
		border-radius: 5px;

		.filter-input.has-value & {
			grid-column: 1 / 2;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		&::after {
			pointer-events: none;
			position: absolute;
			display: block;
			right: 10px;
			top: 12px;
			content: "▾";
			width: 10px;
			height: 10px;
		}
	}

	.filter-input__value {
		min-width: 0;
		padding: 12px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		color: var(--text-color);
		border: 1px solid var(--border-color-ui-secondary);
		background-color: var(--background-color-ui-secondary);
		border-radius: 5px;

		.filter-input.has-value & {
			border-left: 0;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.filter-input__actions {
		display: flex;
		align-items: center;
		margin-left: 15px;
	}
</style>
