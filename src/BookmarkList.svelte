<ul>
	{#each bookmarks as bookmark (bookmark.id)}
		<li>
			{#if bookmark.url.length > 0}
				<a
					href={bookmark.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{bookmark.title}
				</a>
			{:else}
				{bookmark.title}
			{/if}
		</li>
	{/each}
</ul>

<script lang="ts">
	import type { Bookmark } from './store/bookmarks.js';

	export let bookmarks: Bookmark[] = [];
</script>
