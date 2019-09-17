<template>
	<FormItem
		class="FormCheckbox"
		:description="description"
	>
		<input
			class="FormCheckbox__input"
			type="checkbox"
			:id="_uid"
			:checked="value"
			@input="$emit('input', $event.target.value)"
		/>
		<label
			:for="_uid"
			class="FormCheckbox__label"
		>
			{{ label }}
		</label>
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
			type: {
				type: String,
				default: "text"
			},
			value: {
				type: Boolean,
			},
		},
	};
</script>

<style lang="scss">
	.FormCheckbox__input {
		cursor: pointer;
	}

	.FormCheckbox__label {
		cursor: pointer;
		padding-left: 5px;
	}
</style>
