<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { List } from "./../store/lists.js";
	import FormItem from "./form/FormItem.svelte";
	import InputText from "./form/InputText.svelte";
	import TextArea from "./form/TextArea.svelte";
	import Button from "./Button.svelte";

	export let title = "";
	export let description = "";
	export let canDelete = false;

	const dispatch = createEventDispatcher<{
		save: Partial<List>;
		delete: undefined;
		cancel: undefined;
	}>();

	function handleSubmitForm() {
		dispatch("save", {
			title,
			description,
		});
	}

	function handleClickCancel() {
		dispatch("cancel");
	}

	function handleClickDelete() {
		dispatch("delete");
	}
</script>

<form on:submit|preventDefault={handleSubmitForm}>
	<FormItem label="Title" labelFor="listTitle">
		<InputText bind:value={title} type="text" id="listTitle" />
	</FormItem>

	<FormItem label="Description" labelFor="listDescription">
		<TextArea bind:value={description} id="listDescription" />
	</FormItem>

	<Button type="submit">Save</Button>

	<Button on:click={handleClickCancel}>Cancel</Button>

	{#if canDelete}
		<Button on:click={handleClickDelete}>Delete</Button>
	{/if}
</form>
