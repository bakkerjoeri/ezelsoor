<script lang="ts">
	import { favoriteBookmarks } from "../store/bookmarks";
	import { createLocalStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";

	let sortOrder = createLocalStore<SortOrder>(
		"favoritesPageSortOrder",
		"descending"
	);
</script>

<BookmarkPage
	title="Favorites"
	bookmarks={$favoriteBookmarks}
	bind:sortOrder={$sortOrder}
/>
