<script lang="ts">
	import { activeBookmarks } from "../store/bookmarks";
	import { createLocalStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";

	let sortOrder = createLocalStore<SortOrder>(
		"homePageSortOrder",
		"descending"
	);
</script>

<BookmarkPage
	title="My bookmarks"
	bookmarks={$activeBookmarks}
	bind:sortOrder={$sortOrder}
/>
