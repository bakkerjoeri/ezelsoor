<script lang="ts">
	import { searchBookmarks } from "../store/bookmarks";
	import Page from "./Page.svelte";
	import BookmarkList from "../components/BookmarkList.svelte";
	import InputText from "../components/form/InputText.svelte";
	import type { Bookmark } from "../store/bookmarks";

	export let title: string;
	export let description: string = "";
	export let bookmarks: Bookmark[];
	export let searchQuery: string = "";

	$: filteredBookmarks = searchBookmarks(bookmarks, searchQuery);
</script>

<Page>
	<h1>{title}</h1>

	{#if description}
		<p>{description}</p>
	{/if}

	<div class="search">
		<label
			class="search__label"
			for="local-search"
			aria-label="Search here"
		>
			🔎
		</label>

		<InputText bind:value={searchQuery} id="local-search" />
	</div>

	{#if searchQuery}
		<p>Found {filteredBookmarks.length} bookmarks</p>
	{/if}

	<BookmarkList bookmarks={filteredBookmarks} />
</Page>

<style lang="scss">
	h1 {
		line-height: var(--baseline);
		margin-bottom: var(--baseline);
	}

	.search {
		display: flex;
		align-items: center;
		margin-bottom: var(--baseline);
	}

	.search__label {
		font-size: 26px;
		width: 40px;
	}
</style>
