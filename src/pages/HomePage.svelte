<script lang="ts">
	import { activeBookmarks } from "../store/bookmarks";
	import BookmarkPage from "./BookmarkPage.svelte";
</script>

<BookmarkPage title="My bookmarks" bookmarks={$activeBookmarks} />
