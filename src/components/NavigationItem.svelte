<script lang="ts">
	import { Link } from "svelte-routing";
	export let to: string;
	export let count: number | undefined = undefined;
</script>

<li>
	<Link {to} class="link">
		<slot />
	</Link>

	{#if count !== undefined}
		<span class="count">
			&middot; {count}
		</span>
	{/if}
</li>

<style>
	li {
		white-space: nowrap;
		display: flex;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
	}

	:global(.link) {
		color: inherit;
		text-decoration: none;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.link:hover),
	:global(.link:focus) {
		text-decoration: underline;
	}

	:global(.link[aria-current="page"]) {
		color: var(--color-highlight);
	}

	.count {
		margin-left: 6px;
		color: var(--color-text-soft);
	}
</style>
