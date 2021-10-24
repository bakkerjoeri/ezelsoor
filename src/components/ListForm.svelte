<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import {
		bookmarks as allBookmarks,
		searchBookmarks,
	} from "./../store/bookmarks.js";
	import Checkbox from "./form/Checkbox.svelte";
	import FormItem from "./form/FormItem.svelte";
	import InputText from "./form/InputText.svelte";
	import SearchBar from "./SearchBar.svelte";
	import BookmarkForList from "./BookmarkForList.svelte";
	import TextArea from "./form/TextArea.svelte";
	import Button from "./Button.svelte";
	import type { List } from "./../store/lists.js";
	import unique from "../utils/unique.js";
	import { sortObjects } from "../utils/sorting.js";

	export let title = "";
	export let description = "";
	export let showBookmarkCount = false;
	export let bookmarks: string[] = [];
	export let canDelete = false;

	let query = "";

	$: bookmarksInList = bookmarks
		.filter((id) => {
			return $allBookmarks.some((bookmark) => bookmark.id === id);
		})
		.map((id) => {
			return $allBookmarks.find((bookmark) => bookmark.id === id);
		});

	$: bookmarksForSearch = (() => {
		if (query === "") {
			return [];
		}

		const sortedBookmarks = sortObjects(
			$allBookmarks.filter((bookmark) => {
				return !bookmarks.includes(bookmark.id);
			}),
			"createdAt",
			"descending"
		);

		const filteredBookmarks = searchBookmarks(sortedBookmarks, query);

		return filteredBookmarks.slice(0, 40);
	})();

	const dispatch = createEventDispatcher<{
		save: Partial<List>;
		delete: undefined;
		cancel: undefined;
	}>();

	function removeBookmark(idToRemove: string) {
		bookmarks = bookmarks.filter((id) => id !== idToRemove);
	}

	function addBookmark(idToAdd: string) {
		bookmarks = unique([...bookmarks, idToAdd]);
	}

	function handleSubmitForm() {
		dispatch("save", {
			title,
			description,
			showBookmarkCount,
			bookmarks,
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
	<h2>List</h2>
	<FormItem label="Title" labelFor="listTitle">
		<InputText bind:value={title} type="text" id="listTitle" />
	</FormItem>

	<FormItem label="Description" labelFor="listDescription">
		<TextArea bind:value={description} id="listDescription" />
	</FormItem>

	<FormItem>
		<Checkbox
			bind:checked={showBookmarkCount}
			label="Show amount of bookmarks in navigation"
		/>
	</FormItem>

	<FormItem>
		<h3>Bookmarks in list</h3>
		{#if bookmarksInList.length > 0}
			<ul>
				{#each bookmarksInList as bookmark}
					<li>
						<BookmarkForList
							{bookmark}
							actions={[
								{
									label: "remove",
									callback: () => {
										removeBookmark(bookmark.id);
									},
								},
							]}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</FormItem>

	<FormItem>
		<SearchBar bind:query label="Find bookmarks to add" />
		<ul>
			{#each bookmarksForSearch as bookmark}
				<li>
					<BookmarkForList
						{bookmark}
						actions={[
							{
								label: "add",
								callback: () => {
									addBookmark(bookmark.id);
								},
							},
						]}
					/>
				</li>
			{/each}
		</ul>
	</FormItem>

	<FormItem>
		<Button type="submit">Save</Button>

		<Button on:click={handleClickCancel}>Cancel</Button>

		{#if canDelete}
			<Button on:click={handleClickDelete} color="danger">Delete</Button>
		{/if}
	</FormItem>
</form>

<style lang="scss">
	ul {
		list-style: none;
	}
</style>
