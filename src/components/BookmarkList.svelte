<script lang="ts">
	import { bookmarkBeingEdited } from './../store/bookmarks.js';
	import type { Bookmark } from './../store/bookmarks.js';

	export let bookmarks: Bookmark[] = [];

	function onClickEditBookmark(bookmark: Bookmark) {
		$bookmarkBeingEdited = bookmark;
	}
</script>

<ul>
	{#each bookmarks as bookmark (bookmark.id)}
		<li>
			{#if bookmark.url.length > 0}
				<a
					href={bookmark.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{#if bookmark.title.length > 0}
						{bookmark.title}
					{:else}
						{bookmark.url}
					{/if}
				</a>
			{:else}
				{bookmark.title}
			{/if}

			<button
				type="button"
				on:click={() => { onClickEditBookmark(bookmark) }}
			>
				Edit
			</button>
		</li>
	{/each}
</ul>
