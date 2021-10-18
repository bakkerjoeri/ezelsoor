<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import FormItem from "./form/FormItem.svelte";
	import InputText from "./form/InputText.svelte";
	import TextArea from "./form/TextArea.svelte";
	import Button from "./Button.svelte";
	import { doesFilterHaveValue } from "./../store/filters.js";
	import Checkbox from "./form/Checkbox.svelte";
	import FilterInput from "./FilterInput.svelte";
	import type { FilterList, Filter } from "./../store/filters.js";

	export let title = "";
	export let description = "";
	export let shouldIncludeArchived = false;
	export let filters: Filter[] = [];
	export let canDelete: boolean = false;

	const dispatch = createEventDispatcher<{
		save: Partial<FilterList>;
		delete: undefined;
		cancel: undefined;
	}>();

	function handleSubmitForm() {
		dispatch("save", {
			title,
			description,
			shouldIncludeArchived,
			filters,
		});
	}

	function addNewFilter() {
		filters = [
			...filters,
			{
				type: null,
				value: "",
			},
		];
	}

	function deleteFilter(filterToDelete: Filter) {
		filters = filters.filter((filter) => filter !== filterToDelete);
	}
</script>

<h2>Filter</h2>

<form on:submit|preventDefault={handleSubmitForm}>
	<FormItem label="Title" labelFor="listTitle">
		<InputText bind:value={title} type="text" id="listTitle" />
	</FormItem>

	<FormItem label="Description" labelFor="listDescription">
		<TextArea bind:value={description} id="listDescription" />
	</FormItem>

	<FormItem>
		<Checkbox
			bind:checked={shouldIncludeArchived}
			label="Include archived bookmarks"
		/>
	</FormItem>

	<FormItem>
		<Button on:click={addNewFilter}>Add filter</Button>
	</FormItem>

	{#if filters.length > 0}
		{#each filters as filter}
			<FormItem>
				{#if doesFilterHaveValue(filter)}
					<FilterInput
						bind:value={filter.value}
						bind:type={filter.type}
						on:delete={() => {
							deleteFilter(filter);
						}}
					/>
				{:else}
					<FilterInput
						bind:type={filter.type}
						on:delete={() => {
							deleteFilter(filter);
						}}
					/>
				{/if}
			</FormItem>
		{/each}
	{/if}

	<Button type="submit">Save</Button>

	<Button
		on:click={() => {
			dispatch("cancel");
		}}>Cancel</Button
	>

	{#if canDelete}
		<Button
			on:click={() => {
				dispatch("delete");
			}}>Delete</Button
		>
	{/if}
</form>
