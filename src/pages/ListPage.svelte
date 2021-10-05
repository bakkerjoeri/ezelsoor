<script lang="ts">
	import BookmarkList from "../components/BookmarkList.svelte";
	import Page from "../components/Page.svelte";
	import { bookmarks } from "../store/bookmarks";
	import { lists } from "../store/lists";
	import { entityBeingEdited } from "../store/ui";
	import type { List } from "../store/lists";
	import Button from "../components/Button.svelte";

	export let listId: List["id"];

	$: list = $lists.find((list) => list.id === listId);
	$: bookmarksInList = list.bookmarks.map((bookmarkId) => {
		return $bookmarks.find((bookmark) => {
			return bookmark.id === bookmarkId;
		});
	});

	function onClickEditList() {
		$entityBeingEdited = {
			type: "list",
			id: list.id,
		};
	}
</script>

<Page>
	<header>
		<h1>{list.title}</h1>
		<Button on:click={onClickEditList} variant="text">edit list</Button>
	</header>

	{#if list.description}
		<p>{list.description}</p>
	{/if}

	<p>{list.bookmarks.length} bookmarks</p>

	<BookmarkList bookmarks={bookmarksInList} />
</Page>

<style lang="scss">
	header {
		display: flex;
		align-items: baseline;
	}

	h1 {
		margin-right: 15px;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
