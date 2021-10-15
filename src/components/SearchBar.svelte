<script lang="ts">
	import InputText from "./form/InputText.svelte";

	export let query: string;
</script>

<div class="search">
	<label class="search__label" for="local-search" aria-label="Search here">
		🔎
	</label>

	<InputText bind:value={query} id="local-search" />
</div>

<style lang="scss">
	.search {
		display: flex;
		align-items: center;
		margin-bottom: var(--baseline);
	}

	.search__label {
		font-size: 26px;
		width: 40px;
	}
</style>
