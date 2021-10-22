<script lang="ts">
	import { bookmarksToRead } from "../store/bookmarks";
	import { localStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";

	let sortOrder = localStore<SortOrder>("toReadPageSortOrder", "descending");
</script>

<BookmarkPage
	title="Read later"
	bookmarks={$bookmarksToRead}
	bind:sortOrder={$sortOrder}
/>
