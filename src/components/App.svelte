<script lang="ts">
	import BookmarkList from "./BookmarkList.svelte";
	import BookmarkForm from "./BookmarkForm.svelte";
	import { bookmarks, createNewBookmark, bookmarkBeingEdited, bookmarksToRead, activeBookmarks, favoriteBookmarks, archivedBookmarks, tagCount, untaggedBookmarks } from "./../store/bookmarks.js";
	import type { Bookmark } from "./../store/bookmarks.js";
	import { Link, Route, Router } from "svelte-routing";

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
	<Router>
		<nav>
			<ul>
				<li>
					<Link to="/">
						Home
					</Link>
				</li>

				<li>
					<Link to="/toread">
						Read later
					</Link>
				</li>

				<li>
					<Link to="/favorites">
						Favorites
					</Link>
				</li>

				<li>
					<Link to="/archive">
						Archive
					</Link>
				</li>
			</ul>

			<h2>Tags</h2>

			<ul>
				<li>
					<Link to={`/untagged`}>
						Untagged
					</Link>
					
					&middot; {$untaggedBookmarks.length}
				</li>

				{#each Object.entries($tagCount) as [tagName, tagAmount] (tagName)}
					<li>
						<Link to={`/tag/${tagName}`}>
							{tagName}
						</Link>

						&middot; {tagAmount}
					</li>
				{/each}
			</ul>
		</nav>

		<main>
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

				<BookmarkList bookmarks={$bookmarks.filter(bookmark => bookmark.tags.includes(params.tagName))}/>
			</Route>
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
	</Router>
</div>

<style lang="scss">
	.App {
		display: grid;
		grid-template-columns: fit-content(200px) 1fr fit-content(200px);
	}

	nav {
		grid-column: 1 / 2;
	}

	main {
		grid-column: 2 / 3;
	}

	aside {
		grid-column: 3 / 4;
	}
</style>
