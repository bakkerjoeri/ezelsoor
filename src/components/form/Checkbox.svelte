<script lang="ts">
	import uuid from "@bakkerjoeri/uuid";

	export let checked: boolean;
	export let label: string;
	export let labelFor: string = uuid();
</script>

<div>
	<input
		bind:checked={checked}
		type="checkbox"
		id={labelFor}
	>

	<label for={labelFor}>
		{label}
	</label>
</div>

<style lang="scss">
	div {
		margin-bottom: 5px;
	}

	input {
		cursor: pointer;
	}

	label {
		cursor: pointer;
		padding-left: 5px;
	}
</style>
