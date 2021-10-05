<script lang="ts">
	export let disabled: boolean = false;
	export let type: "button" | "submit" = "button";
	export let variant: "outline" | "text" = "outline";
	export let size: "normal" | "small" = "normal";
</script>

<button
	on:click
	{type}
	{disabled}
	class:variant-outline={variant === "outline"}
	class:variant-text={variant === "text"}
	class:size-normal={size === "normal"}
	class:size-small={size === "small"}
>
	<slot />
</button>

<style lang="scss">
	button {
		--border-color-button: gray;
		--text-color-button: #000000;
		--color-button: #ffffff;

		display: inline-block;
		line-height: var(--baseline);
		white-space: nowrap;
		border: 0;
		background-color: transparent;
		color: var(--text-color-button);

		&:not(:disabled) {
			cursor: pointer;
		}
	}

	.variant-outline {
		padding: 0 10px;
		border-radius: 5px;
		border: 1px solid var(--border-color-button);
	}

	.variant-text {
		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	.size-normal {
		font-size: 16px;
	}

	.size-small {
		font-size: 14px;
	}
</style>
