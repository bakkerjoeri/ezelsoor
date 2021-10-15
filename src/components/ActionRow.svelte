<script lang="ts">
	import Button from "./Button.svelte";

	interface Action {
		label: string;
		callback: () => any;
	}

	export let actions: Action[];
</script>

<ul>
	{#each actions as action}
		<li>
			<Button
				type="button"
				on:click={action.callback}
				variant="text"
				size="small"
			>
				{action.label}
			</Button>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
	}

	li + li {
		margin-left: 10px;
	}
</style>
