<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	let scrollY: number = null;
	let previousBodyTop: string = null;
	let previousBodyPosition: string = null;
	let previousBodyOverflow: string = null;
	let previousBodyWidth: string = null;

	onMount(() => {
		scrollY = window.scrollY;
		previousBodyPosition = document.body.style.position;
		previousBodyTop = document.body.style.top;
		previousBodyOverflow = document.body.style.overflow;
		previousBodyWidth = document.body.style.width;
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.overflow = "hidden";
		document.body.style.width = "100%";
	});

	onDestroy(() => {
		console.log("doei");
		document.body.style.position = previousBodyPosition || "";
		document.body.style.top = previousBodyTop || "";
		document.body.style.overflow = previousBodyOverflow || "";
		document.body.style.width = previousBodyWidth || "";

		window.scrollTo(0, scrollY);
	});
</script>

<div class="modal-mask">
	<div class="modal">
		<slot />
	</div>
</div>

<style lang="scss">
	.modal-mask {
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		transition: opacity 0.2s;

		@media (min-width: 480px) {
			align-items: center;
		}
	}

	.modal {
		padding: var(--baseline);
		overflow-y: scroll;
		width: 480px;
		max-width: 100%;
		max-height: 100%;
		background-color: var(--background-color-ui-primary);

		@media (min-width: 480px) {
			margin: var(--baseline);
			max-height: calc(100% - (2 * var(--baseline)));
		}
	}
</style>
