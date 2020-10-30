<template>
	<FormItem
		class="FormSelect"
		:class="{ 'has-error': state === false }"
		:label="label"
		:label-for="id"
		:description="description"
		:error="error"
	>
		<select
			class="FormSelect__dropdown"
			:placeholder="placeholder"
			:type="type"
			:id="id"
			:value="value"
			:required="required"
			@change="$emit('update:value', $event.target.value)"
		>
			<option v-if="placeholder" disabled value="">
				{{ placeholder }}
			</option>

			<option
				class="FormSelect__option"
				v-for="(option, index) in options"
				:key="index"
				:value="option.value"
			>
				{{ option.text }}
			</option>
		</select>
	</FormItem>
</template>

<script>
import uuid from '../utility/uuid';
	import FormItem from './FormItem.vue';
	export default {
		components: {
			FormItem,
		},
		props: {
			description: {
				type: String,
			},
			error: {
				type: String,
			},
			label: {
				type: String,
			},
			options: {
				type: Array,
			},
			placeholder: {
				type: String,
			},
			type: {
				type: String,
				default: "text"
			},
			value: {
				default: null,
			},
			required: {
				type: Boolean,
			},
		},
		data: () => {
			return {
				id: uuid(),
			};
		},
		computed: {
			state() {
				return !this.error;
			},
		},
	};
</script>

<style lang="scss">
	.FormSelect__dropdown {
		display: block;
		width: 100%;
		padding: 12px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid lightgray;
		border-radius: 5px;

		.FormSelect.has-error & {
			border-color: red;
		}
	}
</style>
