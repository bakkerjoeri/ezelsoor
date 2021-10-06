<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import { Link } from "svelte-routing";
	export let to: string;
	export let count: number | undefined = undefined;

	const dispatch = createEventDispatcher<{ navigate: string }>();
</script>

<li class="navigation-item">
	<Link
		{to}
		class="navigation-item__link"
		on:click={() => {
			dispatch("navigate", to);
		}}
	>
		<slot />
	</Link>

	{#if count !== undefined}
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

	:global(.navigation-item__link) {
		color: inherit;
		text-decoration: none;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.navigation-item__link:hover),
	:global(.navigation-item__link:focus) {
		text-decoration: underline;
	}

	:global(.navigation-item__link[aria-current="page"]) {
		color: var(--color-highlight);
	}

	.count {
		margin-left: 6px;
		font-size: 16px;
		color: var(--color-text-soft);
	}
</style>
