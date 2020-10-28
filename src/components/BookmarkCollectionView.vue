<template>
	<div class="BookmarkCollectionView">
		<TopBar class="BookmarkCollectionView__header">
			<template v-slot:left>
				<Button
					v-if="$mq === 'sm'"
					variant="text"
					@click="handleClickToggleMenu"
				>
					Menu
				</Button>

				<h1
					v-else
					class="BookmarkCollectionView__title"
				>
					{{ title }}
				</h1>
			</template>

			<template v-slot:center>
				<h1 class="BookmarkCollectionView__title" v-if="$mq === 'sm'">
					{{ title }}
				</h1>
			</template>

			<template v-slot:right>
				<Row>
					<Button
						variant="text"
						@click="isCreateBookmarkFormOpen = true"
					>
						New
					</Button>
				</Row>
			</template>
		</TopBar>

		<main class="BookmarkCollectionView__content">
			<SearchBar v-model="query"/>
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
	import PubSub from './../utility/PubSub.js';
	import { searchBookmarks } from './../utility/searchBookmarks.js';
	import BookmarkList from './BookmarkList.vue';
	import BookmarkForm from './BookmarkForm.vue';
	import Button from './Button.vue';
	import Modal from './Modal.vue';
	import Row from './Row.vue';
	import SearchBar from './SearchBar.vue';
	import TopBar from './TopBar.vue';

	export default {
		components: {
			BookmarkForm,
			BookmarkList,
			Button,
			Modal,
			Row,
			SearchBar,
			TopBar,
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

				return searchBookmarks(this.bookmarks, this.query);
			},
		},
		methods: {
			handleSubmitBookmark(bookmark) {
				this.$store.dispatch('addBookmark', bookmark);
				this.isCreateBookmarkFormOpen = false;
			},
			handleClickToggleMenu() {
				PubSub.emit('toggleMenu');
			}
		},
	}
</script>

<style lang="scss">
	.BookmarkCollectionView__title {
		font-size: var(--font-size-body);
		line-height: calc(2 * var(--baseline));
	}
</style>
