<template>
	<p class="FormError">
		{{ text }}
	</p>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
			},
		},
	};
</script>

<style lang="scss">
	.FormError {
		color: red;
		font-size: 15px;
		font-style: italic;
	}
</style>
