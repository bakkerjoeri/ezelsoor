<script lang="ts">
	import { navigate } from "svelte-routing";
	import { get } from "svelte/store";
	import {
		bookmarkBeingEdited,
		bookmarks,
		createNewBookmark,
	} from "../store/bookmarks";
	import { listBeingEdited, lists } from "../store/lists";
	import { isPhabletUp, isTabletUp } from "../store/mediaquery";
	import { entityBeingEdited, isNavigationOpen } from "../store/ui";
	import BookmarkForm from "../components/BookmarkForm.svelte";
	import Navigation from "../components/Navigation.svelte";
	import ListForm from "../components/ListForm.svelte";
	import Button from "../components/Button.svelte";
	import Modal from "../components/Modal.svelte";
	import { filterListBeingEdited, filterLists } from "../store/filters";
	import FilterListForm from "../components/FilterListForm.svelte";
	import type { Bookmark } from "../store/bookmarks";
	import type { List } from "../store/lists";
	import type { FilterList } from "../store/filters";

	function onNavigate() {
		$isNavigationOpen = get(isPhabletUp);
		$entityBeingEdited = null;
		window.scrollTo({ top: 0, left: 0 });
	}

	function toggleNavigation() {
		$isNavigationOpen = !$isNavigationOpen;
	}

	function onClickCreateNewBookmark() {
		const newBookmark = createNewBookmark();
		bookmarks.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}

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

	function onSaveEditedFilterList(event: CustomEvent<Partial<FilterList>>) {
		if (!$filterListBeingEdited) {
			throw new Error(
				"Failed saving bookmark because it seems like no bookmark is being edited."
			);
		}

		filterLists.patch($filterListBeingEdited.id, event.detail);
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

		bookmarks.remove($bookmarkBeingEdited.id);
		$entityBeingEdited = null;
	}

	function onDeleteEditedList() {
		if (!$listBeingEdited) {
			throw new Error(
				"Failed deleting list because it seems like no list is being edited."
			);
		}

		if (window.location.pathname.includes(`/list/${$listBeingEdited.id}`)) {
			navigate("/");
		}
		lists.remove($listBeingEdited.id);
		$entityBeingEdited = null;
	}

	function onDeleteEditedFilterList() {
		if (!$filterListBeingEdited) {
			throw new Error(
				"Failed deleting filterList because it seems like no filterList is being edited."
			);
		}

		if (
			window.location.pathname.includes(
				`/filter/${$filterListBeingEdited.id}`
			)
		) {
			navigate("/");
		}
		filterLists.remove($filterListBeingEdited.id);
		$entityBeingEdited = null;
	}
</script>

<div class="page" class:is-navigation-open={$isNavigationOpen}>
	<div class="page__main-header">
		<Button on:click={toggleNavigation} variant="text">
			{#if $isNavigationOpen}
				Close menu
			{:else}
				Open menu
			{/if}
		</Button>

		<Button on:click={onClickCreateNewBookmark} variant="text">New</Button>
	</div>

	{#if $isNavigationOpen}
		{#if !$isPhabletUp}
			<div class="page__navigation-header">
				<Button on:click={toggleNavigation} variant="text">
					Close
				</Button>
			</div>
		{/if}

		<div class="page__navigation">
			<Navigation on:navigate={onNavigate} />
		</div>
	{/if}

	<main class="page__main">
		<slot />
	</main>

	{#if $isTabletUp}
		{#if !!$bookmarkBeingEdited}
			<aside class="page__sidebar">
				{#key $bookmarkBeingEdited.id}
					<BookmarkForm
						title={$bookmarkBeingEdited.title}
						url={$bookmarkBeingEdited.url}
						notes={$bookmarkBeingEdited.notes}
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
						showBookmarkCount={$listBeingEdited.showBookmarkCount}
						bookmarks={$listBeingEdited.bookmarks}
						on:save={onSaveEditedList}
						on:cancel={onCancelEditing}
						on:delete={onDeleteEditedList}
						canDelete
					/>
				{/key}
			</aside>
		{:else if !!$filterListBeingEdited}
			<aside class="page__sidebar">
				{#key $filterListBeingEdited.id}
					<FilterListForm
						title={$filterListBeingEdited.title}
						description={$filterListBeingEdited.description}
						showBookmarkCount={$filterListBeingEdited.showBookmarkCount}
						shouldIncludeArchived={$filterListBeingEdited.shouldIncludeArchived}
						filters={$filterListBeingEdited.filters}
						on:save={onSaveEditedFilterList}
						on:cancel={onCancelEditing}
						on:delete={onDeleteEditedFilterList}
						canDelete
					/>
				{/key}
			</aside>
		{/if}
	{:else if !!$bookmarkBeingEdited}
		<Modal>
			{#key $bookmarkBeingEdited.id}
				<BookmarkForm
					title={$bookmarkBeingEdited.title}
					url={$bookmarkBeingEdited.url}
					notes={$bookmarkBeingEdited.notes}
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
		</Modal>
	{:else if !!$listBeingEdited}
		<Modal>
			{#key $listBeingEdited.id}
				<ListForm
					title={$listBeingEdited.title}
					description={$listBeingEdited.description}
					showBookmarkCount={$listBeingEdited.showBookmarkCount}
					bookmarks={$listBeingEdited.bookmarks}
					on:save={onSaveEditedList}
					on:cancel={onCancelEditing}
					on:delete={onDeleteEditedList}
					canDelete
				/>
			{/key}
		</Modal>
	{:else if !!$filterListBeingEdited}
		<Modal>
			{#key $filterListBeingEdited.id}
				<FilterListForm
					title={$filterListBeingEdited.title}
					description={$filterListBeingEdited.description}
					showBookmarkCount={$filterListBeingEdited.showBookmarkCount}
					shouldIncludeArchived={$filterListBeingEdited.shouldIncludeArchived}
					filters={$filterListBeingEdited.filters}
					on:save={onSaveEditedFilterList}
					on:cancel={onCancelEditing}
					on:delete={onDeleteEditedFilterList}
					canDelete
				/>
			{/key}
		</Modal>
	{/if}
</div>

<style lang="scss">
	.page {
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: calc(2 * var(--baseline)) 1fr;

		@media (max-width: 640px) {
			&.is-navigation-open {
				height: 100vh;
				overflow: hidden;
			}
		}
	}

	.page__main-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		grid-column: 2 / 3;
		grid-row: 1 / 2;

		@media (min-width: 641px) {
			grid-column: 1 / -1;
		}
	}

	.page__navigation-header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	.page__main-header,
	.page__navigation-header {
		position: sticky;
		top: 0;
		height: calc(2 * var(--baseline));
		grid-row: 1;
		padding: 0 var(--baseline);
		background-color: var(--background-color-ui-primary);
		border-bottom: 1px solid var(--border-color-ui-secondary);
	}

	.page__main {
		grid-row: 2 / -1;
		grid-column: 2 / 3;
		width: 100%;
		max-width: 720px;
		justify-self: center;
		padding: var(--baseline);
	}

	.page__navigation {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		width: 100vw;

		@media (min-width: 641px) {
			width: 240px;
			border-right: 1px solid var(--border-color-ui-secondary);
		}
	}

	.page__sidebar {
		grid-column: 3 / -1;
		grid-row: 2 / 3;
		width: 400px;
		padding: var(--baseline);

		@media (min-width: 641px) {
			border-left: 1px solid var(--border-color-ui-secondary);
		}
	}

	.page__sidebar,
	.page__navigation {
		position: sticky;
		overflow: scroll;
		top: calc(2 * var(--baseline));
		height: calc(100vh - 2 * var(--baseline));
	}
</style>
