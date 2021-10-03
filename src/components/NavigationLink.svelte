<script lang="ts">
	import { Link } from "svelte-routing";

	export let to: string;
</script>

<Link {to} class="navigation-link">
	<slot />
</Link>

<style lang="scss">
	:global(.navigation-link) {
		color: inherit;
		text-decoration: none;
	}

	:global(.navigation-link:hover),
	:global(.navigation-link:focus) {
		text-decoration: underline;
	}

	:global(.navigation-link[aria-current="page"]) {
		color: var(--color-highlight);
	}
</style>
