<script lang="ts">
	export let isFavorite: boolean = false;
</script>

<button
	on:click
	class:is-favorite={isFavorite}
	aria-label={isFavorite ? "Remove from favorites" : "Mark as favorite"}
>
	{isFavorite ? "★" : "☆"}
</button>

<style lang="scss">
	button {
		cursor: pointer;
		background-color: transparent;
		border: 0;
		font-size: 17px;
		height: var(--baseline);
		color: var(--color-text-soft);
		transition: 0.2s color;

		&.is-favorite,
		&:hover,
		&:focus-visible {
			color: #ff9b00;
		}
	}
</style>
