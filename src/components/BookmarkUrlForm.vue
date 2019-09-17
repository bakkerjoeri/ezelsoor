<template>
	<form class="BookmarkUrlForm" @submit="onSubmitForm">
		<div class="form-item">
			<label class="form-item__label" for="url">Link</label>
			<input class="form-item__input" id="url" name="url" type="text" v-model="bookmarkData.url" />
		</div>
		<button type="submit">Save</button>
	</form>
</template>

<script>
	import Modal from './Modal';

	const EMPTY_BOOKMARK_DATA = {
		url: '',
	};

	export default {
		components: {
			Modal,
		},
		props: {
			initialBookmark: {
				type: Object,
				default: () => EMPTY_BOOKMARK_DATA,
			},
			onSubmit: {
				type: Function,
			},
		},
		data: function() {
			return {
				bookmarkData: this.initialBookmark,
			};
		},
		methods: {
			onSubmitForm(event) {
				event.preventDefault();
				this.onSubmit(this.bookmarkData);
				this.resetForm();
			},
			resetForm() {
				this.$data.bookmarkData = { url: '' };
			},
		},
	};
</script>

<style lang="scss">
	.BookmarkUrlForm {
		display: flex;
		align-items: center;
	}
</style>
