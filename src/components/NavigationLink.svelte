<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Link } from "svelte-routing";

	export let to: string;

	const dispatch = createEventDispatcher<{ navigate: string }>();
</script>

<Link
	{to}
	class="navigation-link"
	on:click={() => {
		dispatch("navigate", to);
	}}
>
	<slot />
</Link>

<style lang="scss">
	:global(.navigation-link) {
		line-height: var(--baseline);
		color: inherit;
		text-decoration: none;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.navigation-link:hover) {
		text-decoration: underline;
	}

	/*
	We're putting focus-visible by itself because Safari doesn't
	support it and throws the entire selector set out otherwise.
	*/
	:global(.navigation-link:focus-visible) {
		text-decoration: underline;
	}

	:global(.navigation-link[aria-current="page"]) {
		color: var(--color-highlight);
	}
</style>
