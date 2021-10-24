<script lang="ts">
	import { Link } from "svelte-routing";

	export let tags: string[];
	export let allowNavigation: boolean = false;
</script>

<ul>
	{#each tags as tag}
		<li>
			{#if allowNavigation}
				<Link to={`/tag/${tag}`} class="taglist__link">
					{tag}
				</Link>
			{:else}
				{tag}
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
	}

	li {
		font-size: 14px;
		line-height: 26px;

		&:not(:last-child) {
			margin-right: 10px;
		}
	}

	:global(.taglist__link) {
		color: inherit;
	}
</style>
