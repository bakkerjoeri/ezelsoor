<template>
	<button
		class="Button"
		:class="{
			[`Button--size-${size}`]: true,
			[`Button--variant-${variant}`]: true,
			[`Button--color-${color}`]: true,
		}"
		:disabled="disabled"
		@click="$emit('click', $event)"
		:type="type"
	>
		<slot/>
	</button>
</template>

<script>
	export default {
		props: {
			disabled: {
				type: Boolean,
			},
			type: {
				type: String,
				default: 'button',
			},
			size: {
				type: String,
				default: 'normal',
				validator: (value) => ['normal', 'small'].includes(value),
			},
			variant: {
				type: String,
				default: 'outline',
				validator: (value) => ['filled', 'outline', 'text'].includes(value),
			},
			color: {
				type: String,
				default: 'black',
				validator: (value) => ['black', 'transparent'].includes(value),
			}
		},
		emits: ['click'],
	}
</script>

<style lang="scss">
	.Button {
		display: block;
		line-height: var(--baseline);
		font-size: var(--font-size-button);
		white-space: nowrap;
		background-color: transparent;
		border: 0;
		border-radius: 5px;

		&:not(:disabled) {
			cursor: pointer;
		}
	}

	.Button:disabled {
		opacity: 0.5;
	}

	.Button--color-transparent {
		--border-color-button: transparent;
		--background-color-button: transparent;
		--color-button: #ffffff;
	}

	.Button--color-black {
		--border-color-button: gray;
		--background-color-button: #000000;
		--color-button: #ffffff;
	}

	.Button--variant-filled,
	.Button--variant-outline {
		padding-right: var(--padding-button);
		padding-left: var(--padding-button);
	}

	.Button--variant-filled {
		background-color: var(--background-color-button);
		color: var(--color-button);
	}

	.Button--variant-outline {
		border: 1px solid var(--border-color-button);
		color: var(--background-color-button);
	}

	.Button--variant-text {
		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	.Button--size-normal {
		--padding-button: 10px;
		--font-size-button: --font-size-body;
	}

	.Button--size-small {
		--padding-button: 5px;
		--font-size-button: 14px;
	}
</style>
