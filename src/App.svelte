<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import {
		bookmarks,
		createNewBookmark,
		bookmarksToRead,
		activeBookmarks,
		favoriteBookmarks,
		archivedBookmarks,
		untaggedBookmarks,
	} from "./store/bookmarks.js";
	import Login from "./pages/Login.svelte";
	import TaggedWith from "./pages/TaggedWith.svelte";
	import ListPage from "./pages/ListPage.svelte";
	import BookmarkList from "./components/BookmarkList.svelte";
	import Page from "./components/Page.svelte";
	import { entityBeingEdited } from "./store/ui.js";

	function onClickCreateNewBookmark() {
		const newBookmark = createNewBookmark();
		bookmarks.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<Router>
	<Route path="/">
		<Page>
			<button on:click={onClickCreateNewBookmark}>New</button>

			<h1>Your bookmarks</h1>
			<BookmarkList bookmarks={$activeBookmarks} />
		</Page>
	</Route>

	<Route path="toread">
		<Page>
			<h1>Read later</h1>
			<BookmarkList bookmarks={$bookmarksToRead} />
		</Page>
	</Route>

	<Route path="favorites">
		<Page>
			<h1>Favorites</h1>
			<BookmarkList bookmarks={$favoriteBookmarks} />
		</Page>
	</Route>

	<Route path="archive">
		<Page>
			<h1>Archived bookmarks</h1>
			<BookmarkList bookmarks={$archivedBookmarks} />
		</Page>
	</Route>

	<Route path="untagged">
		<Page>
			<h1>Untagged bookmarks</h1>
			<BookmarkList bookmarks={$untaggedBookmarks} />
		</Page>
	</Route>

	<Route path="/list/:listId" let:params>
		<ListPage listId={params.listId} />
	</Route>

	<Route path="/tag/:tagName" let:params>
		<TaggedWith tagName={params.tagName} />
	</Route>

	<Route path="/login">
		<Login />
	</Route>
</Router>
