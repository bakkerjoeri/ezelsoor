<script lang="ts">
	import {
		bookmarks as bookmarkStore,
		createNewBookmark,
		hasBookmark,
	} from "../store/bookmarks";
	import { lists } from "../store/lists";
	import { entityBeingEdited } from "../store/ui";
	import Button from "../components/Button.svelte";
	import BookmarkPage from "./BookmarkPage.svelte";
	import { localStore } from "../store/localStore";
	import type { List } from "../store/lists";
	import type { SortOrder } from "../utils/sorting";

	export let listId: List["id"];

	let actions = [{ label: "Create here", callback: onClickAddHere }];

	$: list = $lists.find((list) => list.id === listId);
	$: bookmarks = list.bookmarks
		.filter((id) => {
			return hasBookmark(id);
		})
		.map((bookmarkId) => {
			return $bookmarkStore.find((bookmark) => {
				return bookmark.id === bookmarkId;
			});
		});
	$: sortOrder = localStore<SortOrder>(
		`list-${listId}-sortOrder`,
		"descending"
	);

	function onClickEdit() {
		$entityBeingEdited = {
			type: "list",
			id: list.id,
		};
	}

	function onClickAddHere() {
		const newBookmark = createNewBookmark();
		bookmarkStore.add(newBookmark);
		lists.patch(list.id, {
			bookmarks: [...list.bookmarks, newBookmark.id],
		});
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<BookmarkPage {bookmarks} bind:sortOrder={$sortOrder} {actions}>
	<span slot="title">
		{#if list.title}
			{list.title}
		{:else}
			<span class="placeholder">New list</span>
		{/if}
	</span>

	<div slot="actions">
		<Button on:click={onClickEdit} variant="text">edit</Button>
	</div>
</BookmarkPage>

<style lang="scss">
	.placeholder {
		color: var(--color-text-soft);
		font-weight: normal;
	}
</style>
