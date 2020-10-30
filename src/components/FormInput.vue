<template>
	<FormItem
		class="FormInput"
		:class="{ 'has-error': state === false }"
		:label="label"
		:label-for="id"
		:description="description"
		:error="error"
	>
		<input
			class="FormInput__input"
			:placeholder="placeholder"
			:type="type"
			:id="id"
			:value="value"
			:required="required"
			:autocomplete="autocomplete"
			:autocorrect="autocorrect"
			:autocapitalize="autocapitalize"
			@input="$emit('update:value', $event.target.value)"
		/>
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
			placeholder: {
				type: String,
			},
			type: {
				type: String,
				default: "text"
			},
			value: {
				type: [String, Number],
			},
			required: {
				type: Boolean,
			},
			autocomplete: {
				type: String,
			},
			autocorrect: {
				type: String,
			},
			autocapitalize: {
				type: String,
			}
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
	.FormInput__input {
		display: block;
		width: 100%;
		padding: 10px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid lightgray;
		border-radius: 5px;

		.FormInput.has-error & {
			border-color: red;
		}
	}
</style>
