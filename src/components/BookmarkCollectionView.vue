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
			<BookmarkList :bookmarks="bookmarks"/>
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
			};
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
		font-size: 18px;
		line-height: calc(2 * var(--baseline));
	}

	.BookmarkCollectionView__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
