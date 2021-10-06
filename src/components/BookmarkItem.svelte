<script lang="ts">
	import { bookmarks } from "../store/bookmarks";
	import { Link } from "svelte-routing";
	import { entityBeingEdited } from "../store/ui.js";
	import type { Bookmark } from "../store/bookmarks";
	import Button from "./Button.svelte";

	export let bookmark: Bookmark;

	function onClickEditBookmark() {
		$entityBeingEdited = {
			type: "bookmark",
			id: bookmark.id,
		};
	}

	function onClickMarkAsRead() {
		bookmarks.patch(bookmark.id, { isToRead: true });
	}
</script>

<div class="BookmarkItem">
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

	<ul class="BookmarkItem__actionList">
		<li class="BookmarkItem__actionItem">
			<Button variant="text" size="small" on:click={onClickEditBookmark}>
				edit
			</Button>
		</li>

		<li class="BookmarkItem__actionItem">
			{#if bookmark.isToRead}
				<Button
					variant="text"
					size="small"
					on:click={onClickMarkAsRead}
				>
					mark as read
				</Button>
			{/if}
		</li>
	</ul>

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
	.BookmarkItem {
		font-size: 17px;
		line-height: var(--baseline);
	}

	.Bookmark__link {
		color: var(--color-link);
	}

	.BookmarkItem__actionList {
		display: flex;
	}

	.BookmarkItem__actionItem + .BookmarkItem__actionItem {
		margin-left: 10px;
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
