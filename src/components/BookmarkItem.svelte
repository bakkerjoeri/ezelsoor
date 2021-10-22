<script lang="ts">
	import { micromark } from "micromark";
	import { bookmarkBeingEdited, bookmarks } from "../store/bookmarks";
	import { entityBeingEdited } from "../store/ui.js";
	import ActionRow from "./ActionRow.svelte";
	import TagList from "./TagList.svelte";
	import type { Bookmark } from "../store/bookmarks";
	import FavButton from "./FavButton.svelte";

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

	$: notesMarkup = micromark(bookmark.notes);

	function startEditing() {
		$entityBeingEdited = {
			type: "bookmark",
			id: bookmark.id,
		};
	}

	function markAsRead() {
		bookmarks.patch(bookmark.id, { isToRead: false });
	}

	function toggleIsFavorite() {
		bookmarks.patch(bookmark.id, { isFavorite: !bookmark.isFavorite });
	}
</script>

<div class="bookmark-item">
	<div class="favbutton">
		<FavButton
			on:click={toggleIsFavorite}
			isFavorite={bookmark.isFavorite}
		/>
	</div>

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

	{#if actions.length > 0}
		<div class="actions">
			<ActionRow {actions} />
		</div>
	{/if}

	{#if bookmark.tags.length > 0}
		<div class="tags">
			<TagList tags={bookmark.tags} />
		</div>
	{/if}

	{#if bookmark.notes}
		<div class="notes">
			{@html notesMarkup}
		</div>
	{/if}
</div>

<style lang="scss">
	.bookmark-item {
		display: grid;
		grid-template-columns: var(--baseline) 1fr;
		grid-template-rows: min-content min-content min-content min-content;

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

	.favbutton {
		grid-column: 1;
		grid-row: 1;
	}

	.link {
		color: var(--color-link);
	}

	.notes {
		grid-column: 1 / 3;
		grid-row: 4;

		@media (min-width: 721px) {
			grid-column: 2 / 3;
		}

		:global(*) {
			font-size: var(--font-size-body);
			line-height: var(--baseline);
		}

		:global(*:last-child) {
			margin-bottom: 0;
		}

		:global(ul),
		:global(ol) {
			padding-left: 1.25em;
		}

		:global(ul) {
			list-style: disc;
		}

		:global(ol) {
			list-style: decimal;
		}
	}
</style>
