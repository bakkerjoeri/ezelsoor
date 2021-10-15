<script lang="ts">
	import { bookmarksToRead } from "../store/bookmarks";
	import BookmarkPage from "./BookmarkPage.svelte";
</script>

<BookmarkPage title="Read later" bookmarks={$bookmarksToRead} />
