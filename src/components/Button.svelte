<script lang="ts">
	export let disabled: boolean = false;
	export let type: "button" | "submit" = "button";
	export let variant: "outline" | "text" = "outline";
	export let size: "normal" | "small" = "normal";
</script>

<button
	{...$$props}
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
		display: inline-block;
		line-height: var(--baseline);
		white-space: nowrap;
		border: 0;
		background-color: transparent;
		color: var(--color-text);

		&:not(:disabled) {
			cursor: pointer;
		}
	}

	.variant-outline {
		padding: 0 10px;
		border-radius: 5px;
		border: 1px solid var(--border-color-ui-primary);
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
