<script lang="ts">
	import uuid from "@bakkerjoeri/uuid";

	export let name: string = uuid();
	export let options: Option[];
	export let value: any;

	interface Option {
		text: string;
		value: any;
	}
</script>

{#each options as option, index}
	<div>
		<input
			bind:group={value}
			type="radio"
			{name}
			id={`${name}-${index}`}
			value={option.value}
		/>

		<label for={`${name}-${index}`}>{option.text}</label>
	</div>
{/each}

<style lang="scss">
	input {
		cursor: pointer;
	}

	label {
		cursor: pointer;
		line-height: var(--baseline);
	}
</style>
