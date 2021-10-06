<script lang="ts">
	import BookmarkList from "../components/BookmarkList.svelte";
	import Page from "./Page.svelte";
	import type { Bookmark } from "../store/bookmarks";

	export let title: string;
	export let bookmarks: Bookmark[];
</script>

<Page>
	<header>
		<h1>{title}</h1>
	</header>

	<BookmarkList {bookmarks} />
</Page>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
