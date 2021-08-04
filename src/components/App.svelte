<script lang="ts">
	import BookmarkList from "./BookmarkList.svelte";
	import BookmarkForm from "./BookmarkForm.svelte";
	import { bookmarks, createNewBookmark, bookmarkBeingEdited } from "./../store/bookmarks.js";
	import type { Bookmark } from "./../store/bookmarks.js";

	function onClickCreateNewBookmark() {
		const newBookmark = createNewBookmark();
		bookmarks.add(newBookmark);
		$bookmarkBeingEdited = newBookmark;
	}

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

<div class="App">
	<header>
		<button>Menu</button>
		<button on:click={onClickCreateNewBookmark}>New</button>
	</header>

	<main>
		<BookmarkList bookmarks={$bookmarks}/>
	</main>

	{#if !!$bookmarkBeingEdited}
		<aside>
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
	.App {
		display: grid;
		grid-template-columns: 1fr fit-content(200px);
	}

	header {
		grid-column: 1 / -1;
	}

	main {
		grid-column: 1 / 2;
	}

	aside {
		grid-column: 2 / 3;
	}
</style>
