<template>
	<FormItem
		class="FormSelect"
		:class="{ 'has-error': state === false }"
		:label="label"
		:label-for="_uid"
		:description="description"
		:error="error"
	>
		<select
			class="FormSelect__dropdown"
			:placeholder="placeholder"
			:type="type"
			:id="_uid"
			:value="value"
			:required="required"
			@change="$emit('change', $event.target.value)"
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
	import FormItem from './FormItem.vue';
	export default {
		components: {
			FormItem,
		},
		model: {
			prop: 'value',
			event: 'change',
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
