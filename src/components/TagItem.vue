<template>
	<router-link
		class="TagItem"
		:to="{ name: 'tag', params: { tagName: tag } }"
	>
		{{ tag }}
	</router-link>
</template>

<script>
	export default {
		props: ['tag'],
	}
</script>

<style lang="scss">
	.TagItem {
		line-height: var(--baseline);
		font-size: 14px;
		color: #000;
	}
</style>
