<script lang="ts">
	export let value: string;
	export let state: boolean | null = null;
	export let autocomplete: string = null;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let id: string;
</script>

<input
	bind:value={value}
	type="password"
	autocomplete={autocomplete}
	required={required}
	disabled={disabled}
	id={id}
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
		border: 1px solid lightgray;
		border-radius: 5px;

		&.has-error {
			border-color: red;
		}

		&.is-valid {
			border-color: green;
		}
	}
</style>
