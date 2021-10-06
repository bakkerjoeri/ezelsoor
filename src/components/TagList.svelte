<script lang="ts">
	import { Link } from "svelte-routing";

	export let tags: string[];
</script>

<ul>
	{#each tags as tag}
		<li>
			<Link to={`/tag/${tag}`} class="taglist__link">
				{tag}
			</Link>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
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
