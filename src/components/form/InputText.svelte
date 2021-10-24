<script lang="ts">
	import uuid from "@bakkerjoeri/uuid";

	export let value: string;
	export let type: "text" | "url" | "email" = "text";
	export let state: boolean | null = null;
	export let autocomplete: string = null;
	export let autocapitalize: string = null;
	export let placeholder: string = null;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let id: string = uuid();
	export let size: "normal" | "small" = "normal";
	export let canClear = false;

	function handleInput(event: any) {
		value = event.target.value;
	}

	function onClickClear() {
		value = "";
	}
</script>

<div class:size-normal={size === "normal"} class:size-small={size === "small"}>
	{#if $$slots.icon}
		<span class="icon">
			<slot name="icon" />
		</span>
	{/if}

	<input
		on:input
		on:input={handleInput}
		{value}
		{type}
		{autocomplete}
		{autocapitalize}
		{placeholder}
		{required}
		{disabled}
		{id}
		class:has-error={state === false}
		class:is-valid={state === true}
		class:can-clear={canClear}
	/>

	{#if canClear && value.length > 0}
		<button on:click={onClickClear} aria-label="Clear input">
			&times;
		</button>
	{/if}
</div>

<style lang="scss">
	div {
		--height: 2 * var(--baseline);
		--border-width: 1px;
		--horizontal-padding: 12px;
		--vertical-padding: 12px;
		--font-size: var(--font-size-body);

		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		font-size: var(--font-size);
	}

	div.size-small {
		--height: var(--baseline);
		--vertical-padding: 0px;
		--horizontal-padding: 8px;
		--font-size: var(--font-size-small);
	}

	input {
		display: block;
		width: 100%;
		padding-top: var(--vertical-padding);
		padding-right: var(--horizontal-padding);
		padding-bottom: var(--vertical-padding);
		padding-left: var(--horizontal-padding);
		font-size: var(--font-size);
		line-height: calc(
			var(--height) - (2 * var(--vertical-padding)) -
				(2 * var(--border-width))
		);
		border: var(--border-width) solid var(--border-color-ui-secondary);
		border-radius: 5px;
		background-color: var(--background-color-ui-secondary);
		color: var(--color-text);

		&.has-error {
			border-color: red;
		}

		&.is-valid {
			border-color: green;
		}

		.icon + & {
			padding-left: calc(1em + (2 * var(--horizontal-padding)));
		}

		&.can-clear {
			padding-right: calc(1em + (2 * var(--horizontal-padding)));
		}
	}

	.icon {
		position: absolute;
		left: var(--horizontal-padding);
		font-size: 1.25em;
		pointer-events: none;
	}

	button {
		display: block;
		position: absolute;
		right: var(--horizontal-padding);
		font-size: 1em;
		font-weight: bold;
		width: 25px;
		height: 25px;
		padding-bottom: 1px;
		background-color: var(--background-color-ui-inverse);
		color: var(--color-text-inverse);
		border: 0;
		border-radius: 25px;

		.size-small & {
			width: 18px;
			height: 18px;
			border-radius: 9px;
		}
	}
</style>
