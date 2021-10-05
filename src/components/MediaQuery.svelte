<script lang="ts">
	import { onMount } from "svelte";

	export let query: string;

	let matches = false;

	onMount(() => {
		let mediaQueryList = window.matchMedia(query);

		mediaQueryList.addEventListener("change", onMatchChange);
		matches = mediaQueryList.matches;

		return () => {
			mediaQueryList.removeEventListener("change", onMatchChange);
		};
	});

	function onMatchChange(event: MediaQueryListEvent) {
		matches = event.matches;
	}
</script>

<slot {matches} />
