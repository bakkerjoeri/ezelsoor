<script lang="ts">
	import InputText from "./form/InputText.svelte";
	import ScreenReaderOnly from "./ScreenReaderOnly.svelte";

	export let query: string;
	export let label = "Search";
	export let size: "normal" | "small" = "normal";
</script>

<ScreenReaderOnly>
	<label for="local-search">{label}</label>
</ScreenReaderOnly>

<InputText
	bind:value={query}
	id="local-search"
	placeholder={label}
	{size}
	canClear
	autocomplete="off"
>
	<span slot="icon">🔎</span>
</InputText>
