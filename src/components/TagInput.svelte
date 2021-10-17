<script lang="ts">
	import InputText from "./form/InputText.svelte";

	export let id = "";
	export let tags = [];

	$: tagString = tags.join(" ");

	function handleInput(event: any) {
		tags = transformTagstringIntoTags(event.target.value);
	}

	function transformTagstringIntoTags(tagString: string): string[] {
		const trimmedTagString = tagString.trim();

		if (!trimmedTagString) {
			return [];
		}

		return trimmedTagString.split(" ");
	}
</script>

<InputText type="text" {id} value={tagString} on:input={handleInput} />
