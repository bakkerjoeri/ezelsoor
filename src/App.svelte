<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import {
		bookmarksToRead,
		favoriteBookmarks,
		archivedBookmarks,
		untaggedBookmarks,
	} from "./store/bookmarks.js";
	import Page from "./components/Page.svelte";
	import BookmarkList from "./components/BookmarkList.svelte";
	import Login from "./pages/Login.svelte";
	import HomePage from "./pages/HomePage.svelte";
	import TaggedWith from "./pages/TaggedWith.svelte";
	import ListPage from "./pages/ListPage.svelte";
</script>

<Router>
	<Route path="/">
		<HomePage />
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
