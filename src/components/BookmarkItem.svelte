<script lang="ts">
	import { bookmarkBeingEdited } from './../store/bookmarks.js';
	import type { Bookmark } from "../store/bookmarks";
	import { Link } from "svelte-routing";

	export let bookmark: Bookmark;

	function onClickEditBookmark(bookmark: Bookmark) {
		$bookmarkBeingEdited = bookmark;
	}
</script>

<div class="Bookmark">
	{#if bookmark.url.length > 0}
		<a
			class="Bookmark__link"
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
		<ul class="BookmarkItem__tags TagList">
			{#each bookmark.tags as tag}
				<li class="TagList__item">
					<Link to={`/tag/${tag}`} class="TagList__link">
						{tag}
					</Link>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.Bookmark {
		font-size: 17px;
		line-height: 26px;
	}

	.Bookmark__link {
		color: #0044ab;
	}

	.TagList {
		display: flex;
	}

	.TagList__item {
		font-size: 14px;
		line-height: 26px;

		&:not(:last-child) {
			margin-right: 10px;
		}
	}

	:global(.TagList__link) {
		color: inherit;
	}
</style>
