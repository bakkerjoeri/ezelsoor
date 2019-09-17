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
	export default {
		props: {
			label: {
				type: String,
			},
			labelFor: {
				type: String,
			},
			description: {
				type: String,
			}
		}
	}
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
</style>
