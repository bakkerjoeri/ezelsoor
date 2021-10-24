<script lang="ts">
	import Button from "./Button.svelte";

	interface Action {
		label: string;
		callback: () => any;
	}

	export let actions: Action[];
	export let size: "small" | "normal" = "small";
</script>

<ul>
	{#each actions as action}
		<li>
			<Button
				type="button"
				on:click={action.callback}
				variant="text"
				{size}
			>
				{action.label}
			</Button>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		list-style: none;
	}

	li + li {
		margin-left: 10px;
	}
</style>
