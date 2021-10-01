<script lang="ts">
import { bookmarkBeingEdited, bookmarks } from "../store/bookmarks";
import type { Bookmark } from "../store/bookmarks";

	import BookmarkForm from "./BookmarkForm.svelte";
	import Navigation from "./Navigation.svelte";

	function onSaveEditedBookmark(event: CustomEvent<Partial<Bookmark>>) {
		if (!$bookmarkBeingEdited) {
			throw new Error('Failed saving bookmark because it seems like no bookmark is being edited.');
		}

		bookmarks.patch($bookmarkBeingEdited.id, event.detail);
		$bookmarkBeingEdited = null;
	}

	function onCancelEditing() {
		$bookmarkBeingEdited = null;
	}

	function onDeleteEditedBookmark() {
		if (!$bookmarkBeingEdited) {
			throw new Error('Failed deleting bookmark because it seems like no bookmark is being edited.');
		}

		bookmarks.delete($bookmarkBeingEdited.id);
		$bookmarkBeingEdited = null;
	}
</script>

<div class="page">
	<nav class="page__navigation">
		<Navigation/>
	</nav>

	<main class="page__main">
		<slot/>
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
	{/if}
</div>

<style lang="scss">
	.page {
		display: grid;
		grid-template-columns: auto 1fr fit-content(480px);
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
