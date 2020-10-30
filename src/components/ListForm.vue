<template>
	<form class="ListForm" @submit.prevent="handleSubmitForm">
		<div class="ListForm__content">
			<FormInput
				label="Title"
				type="text"
				v-model:value="title"
				required
			/>

			<FormTextarea
				label="Description"
				v-model:value="description"
			/>

			<FormCheckbox
				label="Include archived bookmarks"
				v-model:value="shouldIncludeArchived"
			/>

			<FormItem>
				<Button @click="handleClickAddFilter">
					Add filter
				</Button>
			</FormItem>

			<ul v-if="filters.length" class="FilterGroup">
				<li
					class="Filter"
					:class="{ 'Filter--hasInput': doesFilterRequireInput(filter.type) }"
					v-for="(filter, index) in filters"
					:key="index"
				>
					<div class="Filter__type">
						<select
							class="Filter__select"
							v-model="filter.type"
						>
							<option disabled :value="null">
								Select a filter type
							</option>

							<option v-for="(filter, index) in filterOptions" :key="index" :value="filter.value">
								{{ filter.text }}
							</option>
						</select>
					</div>

					<input
						v-if="filter.type === 'matchesSearchTerms'"
						class="Filter__input"
						v-model="filter.query"
						type="text"
					/>

					<input
						v-if="filter.type === 'fromSource'"
						class="Filter__input"
						v-model="filter.source"
						type="text"
					/>

					<input
						v-if="filter.type === 'andTags'"
						class="Filter__input"
						v-model="filter.tags"
						type="text"
					/>

					<input
						v-if="filter.type === 'orTags'"
						class="Filter__input"
						v-model="filter.tags"
						type="text"
					/>

					<div class="Filter__actions">
						<Button
							size="small"
							@click="() => deleteFilter(filter)"
						>
							−
						</Button>
					</div>
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
				v-if="$attrs.onCancel"
				class="ListForm__action"
				@click="$emit('cancel')"
			>
				Cancel
			</Button>

			<Button
				v-if="$attrs.onDelete"
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
		emits: ['cancel, delete, submit'],
		data: function() {
			return {
				title: this.list.title,
				description: this.list.description,
				shouldIncludeArchived: this.list.shouldIncludeArchived,
				filters: [...this.list.filters],
				filterOptions: [
					{value: 'matchesSearchTerms', text: 'Matches search terms'},
					{value: 'fromSource', text: 'From source'},
					{value: 'isFavorite', text: 'Favorite'},
					{value: 'isToRead', text: 'Read later'},
					{value: 'isArchived', text: 'Archived'},
					{value: 'andTags', text: 'Tagged with all of'},
					{value: 'orTags', text: 'Tagged with any of'},
					{value: 'untagged', text: 'Untagged'},
				]
			};
		},
		computed: {
			filterConfig() {
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

					if (filter.type === 'andTags' || filter.type === 'orTags') {
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
					filters: this.filterConfig,
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
			},
			doesFilterRequireInput(filterType) {
				return [
					'matchesSearchTerms',
					'fromSource',
					'andTags',
					'orTags',
				].includes(filterType);
			},
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

	.FilterGroup {
		margin-top: 15px;
		list-style: none;
	}

	.FilterGroup + .FilterGroup {
		margin-top: 15px;
	}

	.Filter {
		display: grid;
		grid-template-columns: minmax(50%, 1fr) 1fr min-content;
	}

	.Filter + .Filter {
		margin-top: 15px;
	}

	.Filter__type {
		position: relative;
		grid-column: 1 / 3;


		.Filter--hasInput & {
			grid-column: 1 / 2;
		}

		&::after {
			pointer-events: none;
			position: absolute;
			display: block;
			right: 10px;
			top: 12px;
			content: '▾';
			width: 10px;
			height: 10px;
		}
	}

	.Filter__select {
		appearance: none;
		padding: 10px 28px 10px 10px;
		width: 100%;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid lightgray;
		border-radius: 5px;

		.Filter--hasInput & {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	.Filter__input {
		min-width: 0;
		padding: 10px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid lightgray;
		border-radius: 5px;

		.Filter--hasInput & {
			border-left: 0;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.Filter__actions {
		margin-left: 15px;
		align-self: center;
	}
</style>
