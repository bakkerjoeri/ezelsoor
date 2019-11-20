<template>
	<div class="BookmarkCollectionView">
		<header class="BookmarkCollectionView__header">
			<Button
				v-if="$mq === 'sm'"
				variant="text"
				@click="$root.$emit('toggleMenu')"
			>
				Menu
			</Button>

			<h1 class="BookmarkCollectionView__title">
				{{ title }}
			</h1>

			<Button
				variant="text"
				@click="isCreateBookmarkFormOpen = true"
			>
				Add
			</Button>
		</header>

		<main class="BookmarkCollectionView__content">
			<div class="Search">
				<span class="Search__icon">🔎</span>
				<input class="Search__input" v-model="query"/>
			</div>


			<BookmarkList :bookmarks="filteredBookmarks"/>
		</main>

		<Modal v-if="isCreateBookmarkFormOpen">
			<BookmarkForm
				@submit="handleSubmitBookmark"
				@cancel="isCreateBookmarkFormOpen = false"
			/>
		</Modal>
	</div>
</template>

<script>
	import BookmarkList from './BookmarkList.vue';
	import BookmarkForm from './BookmarkForm.vue';
	import Button from './Button.vue';
	import Modal from './Modal.vue';

	export default {
		components: {
			BookmarkForm,
			BookmarkList,
			Button,
			Modal,
		},
		props: {
			title: {
				type: String,
				required: true,
			},
			bookmarks: {
				type: Array,
				default: () => ([]),
			},
		},
		data() {
			return {
				isCreateBookmarkFormOpen: false,
				query: '',
			};
		},
		computed: {
			filteredBookmarks() {
				if (!this.query) {
					return this.bookmarks;
				}

				return this.bookmarks.filter((bookmark) => {
					const normalizedQuery = this.query.toLowerCase();

					return normalizedQuery.split(' ').every((queryPart) => {
						const normalizedBookmarkTitle = bookmark.title.toLowerCase();
						const normalizedSummary = bookmark.summary.toLowerCase();
						const normalizedTags = bookmark.tags.join().toLowerCase();

						return normalizedBookmarkTitle.indexOf(queryPart) >= 0 ||
							normalizedSummary.indexOf(queryPart) >= 0 ||
							normalizedTags.indexOf(queryPart) >= 0;
					});
				});
			},
		},
		methods: {
			handleSubmitBookmark(bookmark) {
				this.$store.commit('addBookmark', bookmark);
				this.isCreateBookmarkFormOpen = false;
			},
		},
	}
</script>

<style lang="scss">
	.BookmarkCollectionView__title {
		font-size: var(--font-size-body);
		line-height: calc(2 * var(--baseline));
	}

	.BookmarkCollectionView__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.Search {
		display: flex;
		align-items: center;
		margin-bottom: var(--baseline);
	}

	.Search__icon {
		font-size: 26px;
		width: 40px;
	}

	.Search__input {
		display: block;
		width: 100%;
		padding: 10px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid lightgray;
		border-radius: 5px;
	}
</style>
