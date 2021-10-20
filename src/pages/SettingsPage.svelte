<script lang="ts">
	import Checkbox from "../components/form/Checkbox.svelte";
	import FormItem from "../components/form/FormItem.svelte";
	import RadioGroup from "../components/form/RadioGroup.svelte";
	import {
		preferredColorScheme,
		showReadLaterCount,
		showTagCount,
	} from "../store/ui";
	import Page from "./Page.svelte";
</script>

<Page>
	<h1>Settings</h1>

	<section>
		<FormItem label="Preferred color scheme">
			<RadioGroup
				bind:value={$preferredColorScheme}
				options={[
					{
						text: "sync with OS settings",
						value: "system",
					},
					{
						text: "☀️ light",
						value: "light",
					},
					{
						text: "🌘 dark",
						value: "dark",
					},
				]}
			/>
		</FormItem>
	</section>

	<section>
		<Checkbox
			label="Show bookmark count for read later in navigation"
			bind:checked={$showReadLaterCount}
		/>

		<Checkbox
			label="Show bookmark count for tags in navigation"
			bind:checked={$showTagCount}
		/>
	</section>
</Page>

<style lang="scss">
	section {
		margin-bottom: 26px;
	}
</style>
