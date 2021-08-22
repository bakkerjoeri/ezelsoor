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
