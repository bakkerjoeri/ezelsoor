<script lang="ts">
	import Checkbox from "../components/form/Checkbox.svelte";
	import FormItem from "../components/form/FormItem.svelte";
	import RadioGroup from "../components/form/RadioGroup.svelte";
	import {
		preferredColorScheme,
		showReadLaterCount,
		showTagCount,
		tagSortingMethod,
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
						text: "Sync with OS settings",
						value: "system",
					},
					{
						text: "☀️ Light",
						value: "light",
					},
					{
						text: "🌘 Dark",
						value: "dark",
					},
				]}
			/>
		</FormItem>
	</section>

	<section>
		<Checkbox
			label="Show bookmark count for read later"
			bind:checked={$showReadLaterCount}
		/>

		<Checkbox
			label="Show bookmark count for tags"
			bind:checked={$showTagCount}
		/>
	</section>

	<section>
		<FormItem label="Sort tags">
			<RadioGroup
				bind:value={$tagSortingMethod}
				options={[
					{
						text: "By amount of bookmarks",
						value: "bookmarkCount",
					},
					{
						text: "Alphabetically",
						value: "alphabetically",
					},
				]}
			/>
		</FormItem>
	</section>
</Page>

<style lang="scss">
	section {
		margin-bottom: 26px;
	}
</style>
