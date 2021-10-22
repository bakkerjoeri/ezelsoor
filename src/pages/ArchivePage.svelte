<script lang="ts">
	import { archivedBookmarks } from "../store/bookmarks";
	import { localStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";

	let sortOrder = localStore<SortOrder>("archivePageSortOrder", "descending");
</script>

<BookmarkPage
	title="Archived bookmarks"
	bookmarks={$archivedBookmarks}
	bind:sortOrder={$sortOrder}
/>
