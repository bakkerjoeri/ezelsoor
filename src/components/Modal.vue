<template>
	<portal to="dialog">
		<div class="Modal__mask">
			<div class="Modal">
				<div class="Modal__header" v-if="$slots.header">
					<slot name="header"/>
				</div>
				<div class="Modal__body" v-if="$slots.default">
					<slot/>
				</div>
				<div class="Modal__footer" v-if="$slots.footer">
					<slot name="footer"/>
				</div>
			</div>
		</div>
	</portal>
</template>

<style lang="scss">
	.Modal__mask {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		transition: opacity .2s;

		@media (min-width: 480px) {
			align-items: center;
		}
	}

	.Modal {
		overflow-y: scroll;
		width: 480px;
		max-width: 100%;
		max-height: 100%;
		background-color: #fff;

		@media (min-width: 480px) {
			margin: 20px;
			max-height: calc(100% - 40px);
		}
	}

	.Modal__header,
	.Modal__body,
	.Modal__footer {
		padding: 20px;
	}
</style>
