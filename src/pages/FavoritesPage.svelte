<script lang="ts">
	import {
		bookmarks,
		createNewBookmark,
		favoriteBookmarks,
	} from "../store/bookmarks";
	import { localStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";
	import { entityBeingEdited } from "../store/ui";

	let sortOrder = localStore<SortOrder>(
		"favoritesPageSortOrder",
		"descending"
	);
	let actions = [{ label: "Create here", callback: onClickAddHere }];

	function onClickAddHere() {
		const newBookmark = createNewBookmark({
			isFavorite: true,
		});
		bookmarks.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<BookmarkPage
	title="Favorites"
	bookmarks={$favoriteBookmarks}
	bind:sortOrder={$sortOrder}
	{actions}
/>
