<script lang="ts">
	import BookmarkList from "./BookmarkList.svelte";
	import { bookmarks, createNewBookmark, bookmarkBeingEdited, bookmarksToRead, activeBookmarks, favoriteBookmarks, archivedBookmarks, untaggedBookmarks } from "./../store/bookmarks.js";
	import { Route, Router } from "svelte-routing";
	import Login from "../pages/Login.svelte";
	import Page from "./Page.svelte";

	function onClickCreateNewBookmark() {
		const newBookmark = createNewBookmark();
		bookmarks.add(newBookmark);
		$bookmarkBeingEdited = newBookmark;
	}
	
</script>

<Router>
	<Page>
		<button on:click={onClickCreateNewBookmark}>New</button>

		<Route path="/">
			<h1>Your bookmarks</h1>
			<BookmarkList bookmarks={$activeBookmarks}/>
		</Route>

		<Route path="toread">
			<h1>Read later</h1>
			<BookmarkList bookmarks={$bookmarksToRead}/>
		</Route>

		<Route path="favorites">
			<h1>Favorites</h1>
			<BookmarkList bookmarks={$favoriteBookmarks}/>
		</Route>

		<Route path="archive">
			<h1>Archived bookmarks</h1>
			<BookmarkList bookmarks={$archivedBookmarks}/>
		</Route>

		<Route path="untagged">
			<h1>Untagged bookmarks</h1>
			<BookmarkList bookmarks={$untaggedBookmarks}/>
		</Route>

		<Route path="/tag/:tagName" let:params>
			<h1>Bookmarks tagged with "{params.tagName}"</h1>

			{#key params.tagName}
				<BookmarkList bookmarks={$bookmarks.filter(bookmark => bookmark.tags.includes(params.tagName))}/>
			{/key}
		</Route>

		<Route path="/login">
			<Login/>
		</Route>
	</Page>
</Router>

<style lang="scss">
	h1 {
		font-size: 17px;
		line-height: 52px;
	}
</style>
