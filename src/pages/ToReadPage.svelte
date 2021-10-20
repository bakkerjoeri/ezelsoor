<script lang="ts">
	import { bookmarksToRead } from "../store/bookmarks";
	import { createLocalStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";

	let sortOrder = createLocalStore<SortOrder>(
		"toReadPageSortOrder",
		"descending"
	);
</script>

<BookmarkPage
	title="Read later"
	bookmarks={$bookmarksToRead}
	bind:sortOrder={$sortOrder}
/>
