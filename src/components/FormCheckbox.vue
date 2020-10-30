<template>
	<FormItem
		class="FormCheckbox"
		:description="description"
	>
		<input
			class="FormCheckbox__input"
			type="checkbox"
			:id="id"
			:checked="value"
			@change="$emit('update:value', $event.target.checked)"
		/>
		<label
			:for="id"
			class="FormCheckbox__label"
		>
			{{ label }}
		</label>
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
		data: () => {
			return {
				id: uuid(),
			};
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
