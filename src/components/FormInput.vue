<template>
	<FormItem
		class="FormInput"
		:label="label"
		:label-for="_uid"
		:description="description"
	>
		<input
			class="FormInput__input"
			:placeholder="placeholder"
			:type="type"
			:id="_uid"
			:value="value"
			:required="required"
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
				default: false,
			},
			autocorrect: {
				type: String,
			},
			autocapitalize: {
				type: String,
			}
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
	}
</style>
