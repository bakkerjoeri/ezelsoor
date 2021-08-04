<script lang="ts">
	import TagInput from './TagInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Bookmark } from './../store/bookmarks.js';
	import FormItem from './form/FormItem.svelte';
	import InputText from './form/InputText.svelte';
	import TextArea from './form/TextArea.svelte';
	import Checkbox from './form/Checkbox.svelte';

	export let url = '';
	export let title = '';
	export let notes = '';
	export let tags = [];
	export let isFavorite = false;
	export let isToRead = false;
	export let isArchived = false;
	export let canDelete = false;

	const dispatch = createEventDispatcher<{
		save: Partial<Bookmark>;
		delete: undefined;
		cancel: undefined;
	}>();

	function handleSubmitForm() {
		dispatch('save', {
			title,
			url,
			tags,
			notes,
			isFavorite,
			isToRead,
			isArchived,
		});
	}

	function handleClickCancel() {
		dispatch('cancel');
	}

	function handleClickDelete() {
		dispatch('delete');
	}
</script>

<form on:submit|preventDefault={handleSubmitForm}>
	<FormItem
		label="Link"
		labelFor="bookmarkUrl"
	>
		<InputText
			bind:value={url}
			type="url"
			id="bookmarkUrl"
		/>
	</FormItem>

	<FormItem
		label="Title"
		labelFor="bookmarkTitle"
	>
		<InputText
			bind:value={title}
			type="text"
			id="bookmarkTitle"
		/>
	</FormItem>

	<FormItem
		label="Notes"
		labelFor="bookmarkNotes"
	>
		<TextArea
			bind:value={notes}
			id="bookmarkNotes"
		/>
	</FormItem>

	<FormItem
		label="Tags"
		labelFor="bookmarkTags"
	>
		<TagInput
			bind:tags={tags}
			id="bookmarkTags"
		/>
	</FormItem>

	<Checkbox
		label="Favorite"
		bind:checked={isFavorite}
	/>

	<Checkbox
		label="To read"
		bind:checked={isToRead}
	/>

	<Checkbox
		label="Archived"
		bind:checked={isArchived}
	/>
	
	<button type="submit">
		Save
	</button>

	<button
		type="button"
		on:click={handleClickCancel}
	>
		Cancel
	</button>

	{#if canDelete}
		<button
			type="button"
			on:click={handleClickDelete}
		>
			Delete
		</button>
	{/if}
</form>
