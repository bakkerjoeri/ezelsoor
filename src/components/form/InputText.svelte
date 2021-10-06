<script lang="ts">
	import uuid from "@bakkerjoeri/uuid";

	export let value: string;
	export let type: "text" | "url" | "email" = "text";
	export let state: boolean | null = null;
	export let autocomplete: string = null;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let id: string = uuid();

	function handleInput(event: any) {
		value = event.target.value;
	}
</script>

<input
	on:input={handleInput}
	{value}
	{type}
	{autocomplete}
	{required}
	{disabled}
	{id}
	class:has-error={state === false}
	class:is-valid={state === true}
/>

<style lang="scss">
	input {
		display: block;
		width: 100%;
		padding: 10px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid var(--border-color-ui-secondary);
		border-radius: 5px;
		background-color: var(--background-color-ui-secondary);
		color: var(--color-text);

		&.has-error {
			border-color: red;
		}

		&.is-valid {
			border-color: green;
		}
	}
</style>
