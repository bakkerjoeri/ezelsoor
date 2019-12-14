<template>
	<div class="Row">
		<slot/>
	</div>
</template>

<style lang="scss">
	.Row {
		display: flex;
	}

	.Row > * + * {
		margin-left: 10px;
	}
</style>
