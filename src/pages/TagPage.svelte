<script lang="ts">
	import { activeBookmarks } from "../store/bookmarks";
	import BookmarkPage from "./BookmarkPage.svelte";

	export let tagName: string;

	$: bookmarksWithTag = $activeBookmarks.filter((bookmark) =>
		bookmark.tags.includes(tagName)
	);
</script>

<BookmarkPage title={`#${tagName}`} bookmarks={bookmarksWithTag} />
