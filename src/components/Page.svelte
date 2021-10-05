<script lang="ts">
	import { bookmarkBeingEdited, bookmarks } from "../store/bookmarks";
	import type { Bookmark } from "../store/bookmarks";

	import BookmarkForm from "./BookmarkForm.svelte";
	import Navigation from "./Navigation.svelte";
	import { entityBeingEdited } from "../store/ui";
	import { listBeingEdited, lists } from "../store/lists";
	import ListForm from "./ListForm.svelte";
	import type { List } from "../store/lists";

	function onSaveEditedBookmark(event: CustomEvent<Partial<Bookmark>>) {
		if (!$bookmarkBeingEdited) {
			throw new Error(
				"Failed saving bookmark because it seems like no bookmark is being edited."
			);
		}

		bookmarks.patch($bookmarkBeingEdited.id, event.detail);
		$entityBeingEdited = null;
	}

	function onSaveEditedList(event: CustomEvent<Partial<List>>) {
		if (!$listBeingEdited) {
			throw new Error(
				"Failed saving bookmark because it seems like no bookmark is being edited."
			);
		}

		lists.patch($listBeingEdited.id, event.detail);
		$entityBeingEdited = null;
	}

	function onCancelEditing() {
		$entityBeingEdited = null;
	}

	function onDeleteEditedBookmark() {
		if (!$bookmarkBeingEdited) {
			throw new Error(
				"Failed deleting bookmark because it seems like no bookmark is being edited."
			);
		}

		bookmarks.delete($bookmarkBeingEdited.id);
		$entityBeingEdited = null;
	}

	function onDeleteEditedList() {
		if (!$listBeingEdited) {
			throw new Error(
				"Failed deleting list because it seems like no list is being edited."
			);
		}

		lists.delete($listBeingEdited.id);
		$entityBeingEdited = null;
	}
</script>

<div class="page">
	<nav class="page__navigation">
		<Navigation />
	</nav>

	<main class="page__main">
		<slot />
	</main>

	{#if !!$bookmarkBeingEdited}
		<aside class="page__sidebar">
			{#key $bookmarkBeingEdited.id}
				<BookmarkForm
					title={$bookmarkBeingEdited.title}
					url={$bookmarkBeingEdited.url}
					tags={$bookmarkBeingEdited.tags}
					isFavorite={$bookmarkBeingEdited.isFavorite}
					isToRead={$bookmarkBeingEdited.isToRead}
					isArchived={$bookmarkBeingEdited.isArchived}
					on:save={onSaveEditedBookmark}
					on:cancel={onCancelEditing}
					on:delete={onDeleteEditedBookmark}
					canDelete
				/>
			{/key}
		</aside>
	{:else if !!$listBeingEdited}
		<aside class="page__sidebar">
			{#key $listBeingEdited.id}
				<ListForm
					title={$listBeingEdited.title}
					description={$listBeingEdited.description}
					on:save={onSaveEditedList}
					on:cancel={onCancelEditing}
					on:delete={onDeleteEditedList}
					canDelete
				/>
			{/key}
		</aside>
	{/if}
</div>

<style lang="scss">
	.page {
		display: grid;
		grid-template-columns: 240px 1fr fit-content(480px);
	}

	.page__navigation {
		grid-column: 1 / 2;
		border-right: 1px solid lightgrey;
	}

	.page__main {
		grid-column: 2 / 3;
	}

	.page__sidebar {
		grid-column: 3 / 4;
		border-left: 1px solid lightgrey;
	}

	.page__navigation,
	.page__sidebar {
		overflow: scroll;
		position: sticky;
		top: 0;
		height: 100vh;
	}

	.page__navigation,
	.page__main,
	.page__sidebar {
		padding: var(--baseline);
	}
</style>
