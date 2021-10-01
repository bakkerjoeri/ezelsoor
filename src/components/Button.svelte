<script lang="ts">
	export let disabled: boolean = false;
	export let type: "button" | "submit" = "button";
</script>

<button
	on:click
	type={type}
	disabled={disabled}
>
	<slot></slot>
</button>

<style lang="scss">
	button {
		--border-color-button: gray;
		--text-color-button: #000000;
		--color-button: #ffffff;

		display: inline-block;
		padding: 0 10px;
		line-height: var(--baseline);
		font-size: var(--font-size-button);
		white-space: nowrap;
		background-color: transparent;
		border-radius: 5px;
		border: 1px solid var(--border-color-button);
		color: var(--text-color-button);

		&:not(:disabled) {
			cursor: pointer;
		}
	}
</style>
