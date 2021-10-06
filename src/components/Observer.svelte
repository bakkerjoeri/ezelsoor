<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

	const dispatch = createEventDispatcher<{ intersect: undefined }>();
	export let rootMargin = "0px 0px 0px 0px";
	let element: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry && entry.isIntersecting) {
					dispatch("intersect");
				}
			},
			{ rootMargin }
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div bind:this={element} />
