<template>
	<li class="BookmarkItem">
		<Modal v-if="isEditing">
			<BookmarkForm
				:bookmark="bookmark"
				@submit="handleSubmitBookmarkForm(bookmark.id, $event)"
				@delete="handleDeleteBookmark(bookmark.id)"
				@cancel="isEditing = !isEditing"
			/>
		</Modal>

		<Button
			class="BookmarkItem__favorite"
			:class="{ 'is-favorite': bookmark.isFavorite }"
			variant="filled"
			color="transparent"
			size="small"
			@click="setBookmarkIsFavorite(bookmark.id, !bookmark.isFavorite)"
		>
			★
		</Button>

		<div class="BookmarkItem__title">
			<a
				v-if="bookmark.url"
				:href="bookmark.url"
				target="_blank"
				rel="noopener noreferrer"
				class="BookmarkItem__link"
			>
				{{ bookmark.title || bookmark.url }}
			</a>
			<span v-else>
				{{ bookmark.title || bookmark.url }}
			</span>
		</div>

		<Row class="BookmarkItem__actions">
			<Button
				@click="startEditing"
				variant="text"
				size="small"
			>
				edit
			</Button>

			<Button
				v-if="bookmark.isToRead"
				variant="text"
				size="small"
				@click="setBookmarkIsToRead(bookmark.id, false)"
			>
				mark as read
			</Button>

			<Button
				v-if="!bookmark.isArchived"
				variant="text"
				size="small"
				@click="setBookmarkIsArchived(bookmark.id, true)"
			>
				archive
			</Button>

			<Button
				v-if="bookmark.isArchived"
				variant="text"
				size="small"
				@click="setBookmarkIsArchived(bookmark.id, false)"
			>
				unarchive
			</Button>
		</Row>

		<TagList
			class="BookmarkItem__tags"
			:tags="bookmark.tags"
		/>
	</li>
</template>

<script>
	import Button from './Button.vue';
	import BookmarkForm from './BookmarkForm.vue';
	import Modal from './Modal.vue';
	import Row from './Row.vue';
	import TagList from './TagList.vue';

	export default {
		props: ['bookmark'],
		components: {
			BookmarkForm,
			Button,
			Modal,
			Row,
			TagList,
		},
		data: () => {
			return {
				isEditing: false,
			};
		},
		computed: {
			bookmarkSource() {
				return new URL(this.bookmark.url).hostname;
			}
		},
		methods: {
			startEditing() {
				this.isEditing = true;
			},
			handleSubmitBookmarkForm(id, bookmark) {
				this.updateBookmark(id, bookmark);
				this.isEditing = false;
			},
			handleDeleteBookmark(id) {
				this.deleteBookmark(id);
				this.isEditing = false;
			},
			updateBookmark(id, bookmark) {
				this.$store.dispatch('updateBookmark', { id, bookmark });
			},
			setBookmarkIsToRead(id, isToRead) {
				this.$store.dispatch('updateBookmark', { id, bookmark: { isToRead }});
			},
			setBookmarkIsFavorite(id, isFavorite) {
				this.$store.dispatch('updateBookmark', { id, bookmark: { isFavorite }});
			},
			setBookmarkIsArchived(id, isArchived) {
				this.$store.dispatch('updateBookmark', { id, bookmark: { isArchived }});
			},
			deleteBookmark(bookmarkId) {
				this.$store.dispatch('deleteBookmark', bookmarkId);
			},
		},
	}
</script>

<style lang="scss">
	.BookmarkItem + .BookmarkItem {
		margin-top: var(--baseline);
	}

	.BookmarkItem {
		display: grid;
		grid-template-columns: 26px 1fr;
		grid-template-rows: min-content min-content min-content;

		@media (min-width: 640px) {
			grid-template-columns: 26px 1fr max-content;
			grid-template-rows: min-content min-content;
		}
	}

	.BookmarkItem__title {
		overflow: hidden;
		grid-row: 1;
		grid-column: 2 / -1;
		line-height: var(--baseline);
		text-overflow: ellipsis;

		@media (min-width: 640px) {
			grid-column: 2 / 3;
		}
	}

	.BookmarkItem__link {
		color: #0044ab;
	}

	.BookmarkItem__actions {
		grid-row: 2;
		grid-column: 1 / -1;

		@media (min-width: 640px) {
			grid-row: 1;
			grid-column: 3;

			justify-content: flex-end;
			align-items: flex-start;
			margin-left: 25px;
		}
	}

	.BookmarkItem__tags {
		grid-row: 3;
		grid-column: 1 / -1;

		@media (min-width: 640px) {
			grid-row: 2 / 2;
			grid-column: 2 / -1;
		}
	}

	.BookmarkItem__favorite {
		grid-column: 1;
		grid-row: 1;
		display: flex;
		padding-left: 0;
		color: #ccc;
		font-size: 17px;
		height: var(--baseline);

		&.is-favorite {
			color: gold;
		}
	}
</style>
