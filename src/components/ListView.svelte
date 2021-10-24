<script lang="ts">
	export let items = [];

	export let paginate = false;
	export let currentPage = 1;
	export let pageSize = 20;
</script>

<ul>
	{#each items as item, index (index)}
		<li>
			<slot {item} />
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 0;
		margin: 0;
	}

	li + li {
		margin-top: var(--baseline);
	}
</style>
