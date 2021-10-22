<script lang="ts">
	import { activeBookmarks } from "../store/bookmarks";
	import { localStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";

	let sortOrder = localStore<SortOrder>("homePageSortOrder", "descending");
</script>

<BookmarkPage
	title="My bookmarks"
	bookmarks={$activeBookmarks}
	bind:sortOrder={$sortOrder}
/>
