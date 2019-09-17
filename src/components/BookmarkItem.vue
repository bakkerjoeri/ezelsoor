<template>
	<li class="BookmarkItem">
		<BookmarkForm
			v-if="isEditing"
			:initialBookmark="bookmark"
			@submit="handleSubmitBookmarkForm"
			@delete="deleteBookmark(bookmark.id)"
			@cancel="isEditing = !isEditing"
		/>
		<template v-else>
			<div class="BookmarkItem__title-row">
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
						class="BookmarkItem__link"
					>
						{{ bookmark.title || bookmark.url }}
					</a>
					<span v-else>
						{{ bookmark.title || bookmark.url }}
					</span>
				</div>
				<div class="BookmarkItem__actions">
					<Button
						@click="startEditing"
						class="BookmarkItem__action"
						variant="text"
						size="small"
					>
						edit
					</Button>

					<Button
						v-if="bookmark.isToRead"
						class="BookmarkItem__action"
						variant="text"
						size="small"
						@click="setBookmarkIsToRead(bookmark.id, false)"
					>
						mark as read
					</Button>

					<Button
						v-if="!bookmark.isArchived"
						class="BookmarkItem__action"
						variant="text"
						size="small"
						@click="setBookmarkIsArchived(bookmark.id, true)"
					>
						archive
					</Button>

					<Button
						v-if="bookmark.isArchived"
						class="BookmarkItem__action"
						variant="text"
						size="small"
						@click="setBookmarkIsArchived(bookmark.id, false)"
					>
						unarchive
					</Button>
				</div>
			</div>
			<tag-list
				class="BookmarkItem__tags"
				:tags="tags"
			/>
		</template>
	</li>
</template>

<script>
	import Button from './Button';
	import BookmarkForm from './BookmarkForm';
	import TagList from './TagList';

	export default {
		props: ['bookmark'],
		components: {
			BookmarkForm,
			TagList,
			Button,
		},
		data: () => {
			return {
				isEditing: false,
			};
		},
		computed: {
			tags() {
				return this.$store.getters.tagsOfBookmarkWithId(this.$props.bookmark.id);
			},
			bookmarkSource() {
				return new URL(this.bookmark.url).hostname;
			}
		},
		methods: {
			startEditing() {
				this.isEditing = true;
			},
			handleSubmitBookmarkForm(bookmark) {
				this.$store.commit('updateBookmark', bookmark);
				this.isEditing = false;
			},
			setBookmarkIsToRead(bookmarkId, isToRead) {
				this.$store.commit('setBookmarkIsToRead', {
					id: bookmarkId,
					isToRead,
				});
			},
			setBookmarkIsFavorite(bookmarkId, isFavorite) {
				this.$store.commit('setBookmarkIsFavorite', {
					id: bookmarkId,
					isFavorite,
				});
			},
			setBookmarkIsArchived(bookmarkId, isArchived) {
				this.$store.commit('setBookmarkIsArchived', {
					id: bookmarkId,
					isArchived,
				});
			},
			deleteBookmark(bookmarkId) {
				this.$store.commit('deleteBookmark', {
					id: bookmarkId,
				});
			},
		},
	}
</script>

<style lang="scss">
	.BookmarkItem + .BookmarkItem {
		margin-top: var(--baseline);
	}

	.BookmarkItem__title-row {
		display: flex;
		align-items: flex-start;
	}

	.BookmarkItem__title {
		flex: 0 1 auto;
		line-height: var(--baseline);
	}

	.BookmarkItem__link {
		color: #0044ab;
	}

	.BookmarkItem__actions {
		display: flex;
		flex: 1 1 auto;
		justify-content: flex-end;
	}

	.BookmarkItem__action + .BookmarkItem__action {
		margin-left: 10px;
	}

	.BookmarkItem__tags {
		flex: 0 1 100%;
		margin-left: 25px;
	}

	.BookmarkItem__favorite {
		color: #ccc;
		font-size: 17px;

		&.is-favorite {
			color: gold;
		}
	}
</style>
