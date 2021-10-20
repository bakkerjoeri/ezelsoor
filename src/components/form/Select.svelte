<script lang="ts">
	interface Option {
		text: string;
		value: any;
	}

	export let id: string = undefined;
	export let required: boolean = false;
	export let options: Option[];
	export let value: any = undefined;
	export let size: "small" | "normal" | "big" = "normal";
	export let display: "inline" | "block" = "inline";
	export let variant: "outline" | "text" = "outline";
</script>

<select
	bind:value
	{id}
	{required}
	class:size-small={size === "small"}
	class:size-normal={size === "normal"}
	class:size-big={size === "big"}
	class:display-inline={display === "inline"}
	class:display-block={display === "block"}
	class:variant-outline={variant === "outline"}
	class:variant-text={variant === "text"}
>
	{#each options as option}
		<option value={option.value}>
			{option.text}
		</option>
	{/each}
</select>

<style lang="scss">
	select {
		--select-horizontal-padding: 2px;
		--select-vertical-padding: 2px;
		--select-border-width: 1px;
		--select-height: var(--baseline);
		--select-font-size: var(--font-size-body);

		cursor: pointer;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		font-size: var(--select-font-size);
		color: var(--color-text);
		fill: var(--color-text);
		background-image: url("data:image/svg+xml,<svg viewBox='0 -2 24 22' xmlns='http://www.w3.org/2000/svg'><path style='fill: var(--color-text);' d='m0,6l12,12l12,-12l-24,0z'/><path fill='none' d='m0,0l24,0l0,24l-24,0l0,-24z'/></svg>");
		background-position-x: calc(
			100% - (4px + var(--select-horizontal-padding))
		);
		background-position-y: center;
		background-size: 8px;
		background-repeat: no-repeat;
	}

	select.variant-outline {
		padding-top: var(--select-vertical-padding);
		padding-right: calc(8px + 4px + (2 * var(--select-horizontal-padding)));
		padding-bottom: var(--select-vertical-padding);
		padding-left: var(--select-horizontal-padding);
		line-height: calc(
			var(--select-height) - (2 * var(--select-border-width)) -
				(2 * var(--select-vertical-padding))
		);
		background-color: var(--background-color-ui-secondary);
		border: var(--select-border-width) solid
			var(--border-color-ui-secondary);
		border-radius: 5px;
	}

	select.variant-text {
		padding-top: 0;
		padding-right: calc(8px + 4px + (2 * var(--select-horizontal-padding)));
		padding-bottom: 0;
		padding-left: 0;
		line-height: var(--select-height);
		background-color: transparent;
		border: 0;

		&:hover {
			text-decoration: underline;
		}

		&:focus-visible {
			text-decoration: underline;
		}
	}

	select.size-small {
		--select-height: var(--baseline);
		--select-horizontal-padding: 2px;
		--select-vertical-padding: 2px;
		--select-font-size: 14px;
	}

	select.size-normal {
		--select-height: var(--baseline);
		--select-horizontal-padding: 4px;
		--select-vertical-padding: 4px;
		--select-font-size: var(--font-size-body);
	}

	select.size-big {
		--select-height: calc(var(--baseline) * 2);
		--select-horizontal-padding: 4px;
		--select-vertical-padding: 12px;
		--select-font-size: var(--font-size-body);
	}

	select.display-inline {
		display: inline;
	}

	select.display-block {
		display: block;
		width: 100%;
	}
</style>
