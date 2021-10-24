<script lang="ts">
	import ActionRow from "./ActionRow.svelte";

	export let title = "";
	export let actions = [];
	export let canCollapse = false;
	export let isCollapsed = false;

	$: sectionActions = (() => {
		if (!canCollapse || !$$slots.default) {
			return actions;
		}

		return [
			...actions,
			{
				label: isCollapsed ? "show" : "hide",
				callback: () => {
					isCollapsed = !isCollapsed;
				},
			},
		];
	})();
</script>

<section>
	{#if title || sectionActions}
		<header>
			<h2>{title}</h2>
			<ActionRow actions={sectionActions} />
		</header>
	{/if}

	<slot name="before" />

	{#if !isCollapsed}
		<ul>
			<slot />
		</ul>
	{/if}
</section>

<style lang="scss">
	section {
		margin-bottom: var(--baseline);
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	h2 {
		margin-bottom: 0;
	}

	ul {
		list-style: none;
	}
</style>
