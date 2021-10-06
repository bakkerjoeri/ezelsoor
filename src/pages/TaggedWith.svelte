<script lang="ts">
	import BookmarkList from "../components/BookmarkList.svelte";
	import Page from "./Page.svelte";
	import { bookmarks } from "../store/bookmarks";

	export let tagName: string;

	$: bookmarksWithTag = $bookmarks.filter((bookmark) =>
		bookmark.tags.includes(tagName)
	);
</script>

<Page>
	<h1>Bookmarks tagged with "{tagName}"</h1>

	{#key tagName}
		<BookmarkList bookmarks={bookmarksWithTag} />
	{/key}
</Page>
