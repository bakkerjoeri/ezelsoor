<template>
	<div class="FormItem">
		<label
			v-if="$slots.label || label"
			class="FormItem__label"
			:for="labelFor"
		>
			<slot name="label">
				{{ label }}
			</slot>
		</label>

		<slot />

		<FormError
			v-if="!!error"
			class="FormItem__error"
			:text="error"
		/>

		<div
			class="FormItem__description"
			v-if="!!$slots.description || !!description"
		>
			<slot name="description">
				{{ description }}
			</slot>
		</div>
	</div>
</template>

<script>
	import FormError from './FormError.vue';

	export default {
		components: {
			FormError,
		},
		props: {
			label: {
				type: String,
			},
			labelFor: {
				type: [String, Number],
			},
			description: {
				type: String,
			},
			error: {
				type: String,
			},
		},
	};
</script>

<style lang="scss">
	.FormItem + .FormItem {
		margin-top: 15px;
	}

	.FormItem__label {
		display: block;
		margin-bottom: 5px;

		&[for] {
			cursor: pointer;
		}
	}

	.FormItem__description {
		color: #333;
		font-size: 15px;
		font-style: italic;
	}

	.FormItem__description,
	.FormItem__error {
		margin-top: 5px;
	}
</style>
