<script lang="ts">
	import { bookmarks } from "../store/bookmarks";
	import BookmarkPage from "./BookmarkPage.svelte";

	export let tagName: string;

	$: bookmarksWithTag = $bookmarks.filter((bookmark) =>
		bookmark.tags.includes(tagName)
	);
</script>

<BookmarkPage title={`#${tagName}`} bookmarks={bookmarksWithTag} />
