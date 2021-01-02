<template>
	<div class="SearchBar">
		<span class="SearchBar__icon">🔎</span>

		<input
			class="SearchBar__input"
			:value="query"
			@input="$emit('update:query', $event.target.value)"
		/>
	</div>
</template>

<script>
	export default {
		emits: ['update:query'],
		props: {
			query: {
				type: String,
			},
		},
	};
</script>

<style lang="scss">
	.SearchBar {
		display: flex;
		align-items: center;
		margin-bottom: var(--baseline);
	}

	.SearchBar__icon {
		font-size: 26px;
		width: 40px;
	}

	.SearchBar__input {
		display: block;
		width: 100%;
		padding: 10px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid lightgray;
		border-radius: 5px;
	}
</style>
