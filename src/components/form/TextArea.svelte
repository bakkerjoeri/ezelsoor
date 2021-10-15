<script lang="ts">
	export let id: string;
	export let value: string;
	export let minRows: number = 1;
	export let maxRows: number = undefined;

	let textarea: HTMLTextAreaElement;
	let height = "auto";

	$: if (value && textarea) {
		height = `${textarea.scrollHeight + 2}px`;
	} else {
		height = "auto";
	}

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<textarea
	rows="1"
	{id}
	bind:value
	bind:this={textarea}
	style="min-height: {minHeight}; max-height: {maxHeight}; height: {height}"
/>

<style lang="scss">
	textarea {
		display: block;
		overflow-y: auto;
		resize: none;
		width: 100%;
		max-height: calc(5 * var(--baseline) + 2 * 12px);
		padding: 10px;
		font-family: inherit;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		color: var(--color-text);
		border: 1px solid var(--border-color-ui-secondary);
		border-radius: 5px;
		background-color: var(--background-color-ui-secondary);
	}
</style>
