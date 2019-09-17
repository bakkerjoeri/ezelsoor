<template>
	<form class="BookmarkForm" @submit.prevent="onSubmitForm">
		<div class="BookmarkForm__content">
			<FormInput
				label="Link"
				type="url"
				v-model="url"
			/>

			<FormInput
				label="Title"
				type="text"
				v-model="title"
			/>

			<FormTextarea
				label="Summary"
				v-model="summary"
			/>

			<FormInput
				label="Tags"
				type="text"
				v-model="tagString"
			/>

			<FormCheckbox
				label="To read"
				v-model="isToRead"
			/>
		</div>

		<div class="BookmarkForm__actions">
			<Button class="BookmarkForm__action" type="submit">Save</Button>
			<Button class="BookmarkForm__action" @click="$emit('cancel')">Cancel</Button>
			<Button class="BookmarkForm__action" @click="$emit('delete')">Delete</Button>
		</div>
	</form>
</template>

<script>
	import { DEFAULT_BOOKMARK_PROPERTIES } from './../store';
	import Button from './Button';
	import FormCheckbox from './FormCheckbox';
	import FormInput from './FormInput';
	import FormTextarea from './FormTextarea';

	export default {
		components: {
			Button,
			FormCheckbox,
			FormInput,
			FormTextarea,
		},
		props: {
			initialBookmark: {
				type: Object,
				default: () => ({ ...DEFAULT_BOOKMARK_PROPERTIES }),
			},
		},
		data: function() {
			return {
				url: this.initialBookmark.url,
				title: this.initialBookmark.title,
				summary: this.initialBookmark.summary,
				isToRead: this.initialBookmark.isToRead,
				tagString: this.initialBookmark.tags.join(' '),
			};
		},
		methods: {
			onSubmitForm() {
				this.$emit('submit', { ...this.bookmark });
			},
		}
	}
</script>

<style lang="scss">
	.BookmarkForm__content + .BookmarkForm__actions {
		margin-top: 15px;
	}

	.BookmarkForm__actions {
		display: flex;
	}

	.BookmarkForm__action + .BookmarkForm__action {
		margin-left: 10px;
	}
</style>
