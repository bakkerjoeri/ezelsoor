<script lang="ts">
	import BookmarkList from "../components/BookmarkList.svelte";
	import Button from "../components/Button.svelte";
	import Page from "./Page.svelte";
	import {
		activeBookmarks,
		bookmarks,
		createNewBookmark,
	} from "../store/bookmarks";
	import { entityBeingEdited } from "../store/ui";

	function onClickCreateNewBookmark() {
		const newBookmark = createNewBookmark();
		bookmarks.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<Page>
	<div class="body">
		<header>
			<h1>Your bookmarks</h1>
			<Button on:click={onClickCreateNewBookmark} variant="outline">
				+ new bookmark
			</Button>
		</header>

		<BookmarkList bookmarks={$activeBookmarks} />
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
