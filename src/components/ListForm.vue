<template>
	<form class="ListForm" @submit.prevent="handleSubmitForm">
		<div class="ListForm__content">
			<FormInput
				label="Title"
				type="text"
				v-model="title"
				required
			/>

			<FormTextarea
				label="Description"
				v-model="description"
			/>

			<FormCheckbox
				label="Include archived bookmarks"
				v-model="shouldIncludeArchived"
			/>

			<FormItem>
				<Button @click="handleClickAddFilter">Add filter</Button>
			</FormItem>

			<ul v-if="filters.length">
				<li
					v-for="(filter, index) in filters"
					:key="index"
				>
					<select v-model="filter.type">
						<option selected disabled :value="null">
							Select a filter type
						</option>

						<option value="matchesSearchTerms">
							Matches search terms
						</option>

						<option value="fromSource">
							From source
						</option>

						<option value="isFavorite">
							Favorite
						</option>

						<option value="isToRead">
							Read later
						</option>

						<option value="isArchived">
							Archived
						</option>

						<option value="taggedWithAllOf">
							Tagged with all of
						</option>

						<option value="taggedWithAnyOf">
							Tagged with any of
						</option>

						<option value="untagged">
							Untagged
						</option>
					</select>

					<input
						v-if="filter.type === 'matchesSearchTerms'"
						v-model="filter.query"
						type="text"
					>

					<input
						v-if="filter.type === 'fromSource'"
						v-model="filter.source"
						type="text"
					>

					<input
						v-if="filter.type === 'taggedWithAllOf'"
						v-model="filter.tags"
						type="text"
					>

					<input
						v-if="filter.type === 'taggedWithAnyOf'"
						v-model="filter.tags"
						type="text"
					>

					<Button variant="text" size="small" @click="() => deleteFilter(filter)">remove</Button>
				</li>
			</ul>
		</div>

		<div class="ListForm__actions">
			<Button
				class="ListForm__action"
				type="submit"
			>
				Save
			</Button>

			<Button
				v-if="$listeners.cancel"
				class="ListForm__action"
				@click="$emit('cancel')"
			>
				Cancel
			</Button>

			<Button
				v-if="$listeners.delete"
				class="ListForm__action"
				@click="$emit('delete')"
			>
				Delete
			</Button>
		</div>
	</form>
</template>

<script>
	import Button from './Button.vue';
	import FormCheckbox from './FormCheckbox.vue';
	import FormInput from './FormInput.vue';
	import FormItem from './FormItem.vue';
	import FormTextarea from './FormTextarea.vue';

	export default {
		components: {
			Button,
			FormCheckbox,
			FormInput,
			FormItem,
			FormTextarea,
		},
		props: {
			list: {
				type: Object,
				default: () => ({
					title: '',
					description: '',
					shouldIncludeArchived: false,
					filters: [],
				}),
			},
		},
		data: function() {
			return {
				title: this.list.title,
				description: this.list.description,
				shouldIncludeArchived: this.list.shouldIncludeArchived,
				filters: [...this.list.filters],
			};
		},
		computed: {
			filterOptions() {
				return this.filters.filter(filter => {
					return filter.type;
				}).map(filter => {
					if (filter.type === 'matchesSearchTerms') {
						return {
							type: filter.type,
							query: filter.query,
						}
					}

					if (filter.type === 'fromSource') {
						return {
							type: filter.type,
							source: filter.source,
						}
					}

					if (filter.type === 'taggedWithAllOf' || filter.type === 'taggedWithAnyOf') {
						return {
							type: filter.type,
							tags: filter.tags,
						}
					}

					return {
						type: filter.type,
					};
				});
			},
		},
		methods: {
			handleSubmitForm() {
				this.$emit('submit', {
					title: this.title.trim(),
					description: this.description.trim(),
					shouldIncludeArchived: this.shouldIncludeArchived,
					filters: this.filterOptions,
				});
			},
			handleClickAddFilter() {
				this.filters.push({
					type: null,
					query: '',
					source: '',
					tags: '',
				});
			},
			deleteFilter(filterToDelete) {
				this.filters = this.filters.filter(filter => {
					return filter !== filterToDelete;
				});
			}
		},
	}
</script>

<style lang="scss">
	.ListForm__content + .ListForm__actions {
		margin-top: 20px;
	}

	.ListForm__actions {
		display: flex;
	}

	.ListForm__action + .ListForm__action {
		margin-left: 10px;
	}
</style>
