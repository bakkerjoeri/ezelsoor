<script lang="ts">
	import { bookmarkBeingEdited, bookmarks } from "../store/bookmarks";
	import { entityBeingEdited } from "../store/ui.js";
	import ActionRow from "./ActionRow.svelte";
	import TagList from "./TagList.svelte";
	import type { Bookmark } from "../store/bookmarks";

	export let bookmark: Bookmark;

	$: actions = (() => {
		const actions = [];

		if (bookmark.isToRead) {
			actions.push({
				label: "mark as read",
				callback: markAsRead,
			});
		}

		if ($bookmarkBeingEdited?.id !== bookmark.id) {
			actions.push({
				label: "edit",
				callback: startEditing,
			});
		}

		return actions;
	})();

	function startEditing() {
		$entityBeingEdited = {
			type: "bookmark",
			id: bookmark.id,
		};
	}

	function markAsRead() {
		bookmarks.patch(bookmark.id, { isToRead: true });
	}

	function toggleIsFavorite() {
		bookmarks.patch(bookmark.id, { isFavorite: !bookmark.isFavorite });
	}
</script>

<div class="bookmark-item">
	<button
		on:click={toggleIsFavorite}
		class="button-toggle-favorite"
		class:is-favorite={bookmark.isFavorite}
		aria-label={bookmark.isFavorite
			? "Remove from favorites"
			: "Mark as favorite"}
	>
		{bookmark.isFavorite ? "★" : "☆"}
	</button>

	<h3 class="title" class:is-placeholder={!bookmark.url && !bookmark.title}>
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

	<div class="actions">
		<ActionRow {actions} />
	</div>

	<div class="tags">
		{#if bookmark.tags.length > 0}
			<TagList tags={bookmark.tags} />
		{/if}
	</div>
</div>

<style lang="scss">
	.bookmark-item {
		display: grid;
		grid-template-columns: var(--baseline) 1fr;
		grid-template-rows: min-content min-content min-content;

		@media (min-width: 721px) {
			grid-template-columns: var(--baseline) 1fr max-content;
			grid-template-rows: min-content min-content;
		}
	}

	.title {
		grid-row: 1;
		grid-column: 2 / -1;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 17px;
		font-weight: normal;
		line-height: var(--baseline);

		&.is-placeholder {
			color: var(--color-text-soft);
		}

		@media (min-width: 721px) {
			grid-column: 2 / 3;
		}
	}

	.actions {
		grid-row: 3;
		grid-column: 1 / -1;

		@media (min-width: 721px) {
			grid-row: 1;
			grid-column: 3;
			margin-left: 15px;
		}
	}

	.tags {
		grid-row: 2;
		grid-column: 1 / -1;

		@media (min-width: 721px) {
			grid-row: 2 / 2;
			grid-column: 2 / -1;
		}
	}

	.button-toggle-favorite {
		grid-column: 1;
		grid-row: 1;
		cursor: pointer;
		background-color: transparent;
		border: 0;
		font-size: 17px;
		height: var(--baseline);
		color: var(--color-text-soft);
		transition: 0.2s color;

		&.is-favorite,
		&:hover,
		&:focus-visible {
			color: #ff9b00;
		}
	}

	.link {
		color: var(--color-link);
	}
</style>
