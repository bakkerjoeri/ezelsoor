<template>
	<form class="BookmarkForm" @submit.prevent="onSubmitForm">
		<div class="BookmarkForm__content">
			<FormInput
				label="Link"
				type="url"
				v-model:value.trim="url"
			/>

			<FormInput
				label="Title"
				type="text"
				v-model:value="title"
			/>

			<FormTextarea
				label="Notes"
				v-model:value="summary"
			/>

			<FormInput
				label="Tags"
				type="text"
				autocorrect="off"
				autocapitalize="off"
				v-model:value="tagString"
			/>

			<FormCheckbox
				label="Favorite"
				v-model:value="isFavorite"
			/>

			<FormCheckbox
				label="To read"
				v-model:value="isToRead"
			/>

			<FormCheckbox
				label="Archived"
				v-model:value="isArchived"
			/>
		</div>

		<div class="BookmarkForm__actions">
			<Button
				class="BookmarkForm__action"
				type="submit"
			>
				Save
			</Button>

			<Button
				v-if="onCancel"
				class="BookmarkForm__action"
				@click="$emit('cancel')"
			>
				Cancel
			</Button>

			<Button
				v-if="onDelete"
				class="BookmarkForm__action"
				@click="$emit('delete')"
			>
				Delete
			</Button>
		</div>
	</form>
</template>

<script>
	import { DEFAULT_BOOKMARK_PROPERTIES } from './../store';
	import unique from './../utility/unique.js';
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
			bookmark: {
				type: Object,
				default: () => ({ ...DEFAULT_BOOKMARK_PROPERTIES }),
			},
			onCancel: {
				type: Function,
			},
			onDelete: {
				type: Function,
			},
		},
		emits: ['cancel', 'delete', 'submit'],
		data: function() {
			return {
				url: this.bookmark.url || DEFAULT_BOOKMARK_PROPERTIES.url,
				title: this.bookmark.title || DEFAULT_BOOKMARK_PROPERTIES.title,
				summary: this.bookmark.summary || DEFAULT_BOOKMARK_PROPERTIES.summary,
				isFavorite: this.bookmark.isFavorite || DEFAULT_BOOKMARK_PROPERTIES.isFavorite,
				isToRead: this.bookmark.isToRead || DEFAULT_BOOKMARK_PROPERTIES.isToRead,
				isArchived: this.bookmark.isArchived || DEFAULT_BOOKMARK_PROPERTIES.isArchived,
				tagString: (this.bookmark.tags || DEFAULT_BOOKMARK_PROPERTIES.tags).join(' '),
			};
		},
		methods: {
			onSubmitForm() {
				this.$emit('submit', {
					url: this.url,
					title: this.title.trim(),
					summary: this.summary,
					isFavorite: this.isFavorite,
					isToRead: this.isToRead,
					isArchived: this.isArchived,
					tags: this.tagString.trim() ? unique(this.tagString.trim().split(' ')) : [],
				});
			},
		},
	}
</script>

<style lang="scss">
	.BookmarkForm__content + .BookmarkForm__actions {
		margin-top: 20px;
	}

	.BookmarkForm__actions {
		display: flex;
	}

	.BookmarkForm__action + .BookmarkForm__action {
		margin-left: 10px;
	}
</style>
