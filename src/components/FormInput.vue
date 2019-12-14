<template>
	<FormItem
		class="FormInput"
		:class="{ 'has-error': state === false }"
		:label="label"
		:label-for="_uid"
		:description="description"
		:error="error"
	>
		<input
			class="FormInput__input"
			:placeholder="placeholder"
			:type="type"
			:id="_uid"
			:value="value"
			:required="required"
			:autocomplete="autocomplete"
			:autocorrect="autocorrect"
			:autocapitalize="autocapitalize"
			@input="$emit('input', $event.target.value)"
		/>
	</FormItem>
</template>

<script>
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
