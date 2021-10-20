<script lang="ts">
	import { archivedBookmarks } from "../store/bookmarks";
	import { createLocalStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";

	let sortOrder = createLocalStore<SortOrder>(
		"archivePageSortOrder",
		"descending"
	);
</script>

<BookmarkPage
	title="Archived bookmarks"
	bookmarks={$archivedBookmarks}
	bind:sortOrder={$sortOrder}
/>
