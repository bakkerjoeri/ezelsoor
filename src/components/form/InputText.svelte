<script lang="ts">
	export let value: string;
	export let type: 'text' | 'url' | 'email' = 'text';
	export let state: boolean | null = null;
	export let id: string;

	function handleInput(event: any) {
		value = event.target.value;
	}
</script>

<input
	on:input={handleInput}
	value={value}
	type={type}
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
