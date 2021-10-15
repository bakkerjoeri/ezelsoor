<script lang="ts">
	import { favoriteBookmarks } from "../store/bookmarks";
	import BookmarkPage from "./BookmarkPage.svelte";
</script>

<BookmarkPage title="Favorites" bookmarks={$favoriteBookmarks} />
