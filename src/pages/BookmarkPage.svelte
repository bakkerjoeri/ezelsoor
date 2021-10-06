<script lang="ts">
	import BookmarkList from "../components/BookmarkList.svelte";
	import Button from "../components/Button.svelte";
	import Page from "./Page.svelte";
	import { entityBeingEdited } from "../store/ui";
	import {
		bookmarks as bookmarkStore,
		createNewBookmark,
	} from "../store/bookmarks";
	import type { Bookmark } from "../store/bookmarks";

	export let title: string;
	export let bookmarks: Bookmark[];

	function onClickCreateNewBookmark() {
		const newBookmark = createNewBookmark();
		bookmarkStore.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<Page>
	<div class="body">
		<header>
			<h1>{title}</h1>
			<Button on:click={onClickCreateNewBookmark} variant="outline">
				+ new bookmark
			</Button>
		</header>

		<BookmarkList {bookmarks} />
	</div>
</Page>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.body {
		padding: var(--baseline);
		max-width: 720px;
		margin: 0 auto;
	}
</style>
