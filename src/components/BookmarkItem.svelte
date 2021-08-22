<script lang="ts">
	import { bookmarkBeingEdited } from './../store/bookmarks.js';
	import type { Bookmark } from "../store/bookmarks";
	import { Link } from "svelte-routing";

	export let bookmark: Bookmark;

	function onClickEditBookmark(bookmark: Bookmark) {
		$bookmarkBeingEdited = bookmark;
	}
</script>

<div>
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

	{#if bookmark.tags.length > 0}
		<ul>
			{#each bookmark.tags as tag}
				<li>
					<Link to={`/tag/${tag}`}>
						{tag}
					</Link>
				</li>
			{/each}
		</ul>
	{/if}
</div>
