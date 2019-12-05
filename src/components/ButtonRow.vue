<template>
	<div class="ButtonRow">
		<slot/>
	</div>
</template>

<style lang="scss">
	.ButtonRow {
		display: flex;
	}

	.ButtonRow > * + * {
		margin-left: 10px;
	}
</style>
