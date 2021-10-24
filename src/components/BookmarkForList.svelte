<script lang="ts">
	import ActionRow from "./ActionRow.svelte";
	import type { Bookmark } from "../store/bookmarks";

	export let bookmark: Bookmark;
	export let actions = [];
</script>

<div class="bookmark-item">
	<h3 class="title" class:is-placeholder={!bookmark.url && !bookmark.title}>
		{#if bookmark.isFavorite}
			<span class="fav">★</span>
		{/if}

		{#if bookmark.url.length > 0}
			<a
				class="link"
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
		{:else if bookmark.title}
			{bookmark.title}
		{:else}
			New bookmark
		{/if}
	</h3>

	{#if actions.length > 0}
		<div class="actions">
			<ActionRow {actions} />
		</div>
	{/if}
</div>

<style lang="scss">
	.bookmark-item {
		display: grid;
		grid-template-columns: 1fr max-content;
		grid-template-rows: min-content;
	}

	.title {
		grid-row: 1;
		grid-column: 1 / 2;
		overflow: hidden;
		margin-bottom: 0;
		text-overflow: ellipsis;
		font-size: 17px;
		font-weight: normal;
		line-height: var(--baseline);

		&.is-placeholder {
			color: var(--color-text-soft);
		}
	}

	.actions {
		grid-row: 1;
		grid-column: 2 / 3;
		margin-left: 15px;
	}

	.fav {
		color: #ff9b00;
	}

	.link {
		color: var(--color-link);
	}
</style>
