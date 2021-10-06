<script lang="ts">
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

<input type="text" {id} value={tagString} on:input={handleInput} />

<style lang="scss">
	input {
		display: block;
		width: 100%;
		padding: 10px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid var(--border-color-ui-secondary);
		border-radius: 5px;
		background-color: var(--background-color-ui-secondary);
		color: var(--color-text);
	}
</style>
