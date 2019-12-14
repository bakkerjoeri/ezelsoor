<template>
	<header class="TopBar">
		<div class="TopBar__left">
			<slot name="left"/>
		</div>

		<div class="TopBar__center">
			<slot name="center"/>
		</div>

		<div class="TopBar__right">
			<slot name="right"/>
		</div>
	</header>
</template>

<style lang="scss">
	.TopBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
