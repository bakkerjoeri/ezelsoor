<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Bookmark } from './../store/bookmarks.js';
	import unique from './../utils/unique.js';
	import TagInput from './TagInput.svelte';
	import FormItem from './form/FormItem.svelte';
	import InputText from './form/InputText.svelte';
	import TextArea from './form/TextArea.svelte';
	import Checkbox from './form/Checkbox.svelte';
	import Button from './Button.svelte';

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
			tags: unique(tags),
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
	
	<Button type="submit">
		Save
	</Button>

	<Button on:click={handleClickCancel}>
		Cancel
	</Button>

	{#if canDelete}
		<Button on:click={handleClickDelete}>
			Delete
		</Button>
	{/if}
</form>
