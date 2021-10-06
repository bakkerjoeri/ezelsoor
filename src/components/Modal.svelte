<div class="modal-mask">
	<div class="modal">
		<slot />
	</div>
</div>

<style lang="scss">
	.modal-mask {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		transition: opacity 0.2s;

		@media (min-width: 480px) {
			align-items: center;
		}
	}

	.modal {
		padding: var(--baseline);
		overflow-y: scroll;
		width: 480px;
		max-width: 100%;
		max-height: 100%;
		background-color: #fff;

		@media (min-width: 480px) {
			margin: var(--baseline);
			max-height: calc(100% - (2 * var(--baseline)));
		}
	}
</style>
