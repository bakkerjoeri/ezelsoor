<script lang="ts">
	export let description: string = "";
	export let error: string = "";
	export let label: string = "";
	export let labelFor: string = "";
</script>

<div>
	{#if label}
		<label for={labelFor}>
			{label}
		</label>
	{/if}

	<slot />

	{#if description}
		<p class="description">{description}</p>
	{/if}

	{#if error}
		<p class="error">{description}</p>
	{/if}
</div>

<style lang="scss">
	div:not(:last-child) {
		margin-bottom: 15px;
	}

	label {
		display: block;
		margin-bottom: 5px;

		&[for] {
			cursor: pointer;
		}
	}

	.description {
		color: #333;
		font-size: 15px;
		font-style: italic;
	}

	.description,
	.error {
		margin-top: 5px;
	}
</style>
