<script lang="ts">
	import NavigationLink from "./NavigationLink.svelte";

	export let to: string;
	export let count: number | undefined = undefined;
</script>

<li class="navigation-item">
	<NavigationLink {to} on:navigate>
		<slot />
	</NavigationLink>

	{#if count !== undefined || count > 0}
		<span class="count">
			&middot; {count}
		</span>
	{/if}
</li>

<style>
	.navigation-item {
		white-space: nowrap;
		display: flex;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
	}

	.count {
		margin-left: 6px;
		font-size: 16px;
		color: var(--color-text-soft);
	}
</style>
