<script lang="ts">
	import { archivedBookmarks } from "../store/bookmarks";
	import BookmarkPage from "./BookmarkPage.svelte";
</script>

<BookmarkPage title="Archived bookmarks" bookmarks={$archivedBookmarks} />
