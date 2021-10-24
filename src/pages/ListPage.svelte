<script lang="ts">
	import { bookmarks as bookmarkStore } from "../store/bookmarks";
	import { lists } from "../store/lists";
	import { entityBeingEdited } from "../store/ui";
	import Button from "../components/Button.svelte";
	import BookmarkPage from "./BookmarkPage.svelte";
	import { localStore } from "../store/localStore";
	import type { List } from "../store/lists";
	import type { SortOrder } from "../utils/sorting";

	export let listId: List["id"];

	$: list = $lists.find((list) => list.id === listId);
	$: bookmarks = list.bookmarks.map((bookmarkId) => {
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
</script>

<BookmarkPage {bookmarks} bind:sortOrder={$sortOrder}>
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
