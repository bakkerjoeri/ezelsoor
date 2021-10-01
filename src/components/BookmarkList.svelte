<script lang="ts">
	import type { Bookmark } from './../store/bookmarks.js';
	import BookmarkItem from './BookmarkItem.svelte';

	export let bookmarks: Bookmark[] = [];
</script>

<ul>
	{#each bookmarks as bookmark (bookmark.id)}
		<li>
			<BookmarkItem bookmark={bookmark}/>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 0;
		margin: 0;
	}

	li + li {
		margin-top: 26px;
	}
</style>
