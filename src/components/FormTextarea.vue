<template>
	<FormItem
		class="FormTextarea"
		:label="label"
		:label-for="_uid"
		:description="description"
	>
		<textarea
			rows="1"
			ref="textarea"
			class="FormTextarea__input"
			:id="_uid"
			:value="value"
			@input="handleInput"
		/>
	</FormItem>
</template>

<script>
	import FormItem from './FormItem.vue';
	export default {
		components: {
			FormItem,
		},
		props: {
			description: {
				type: String,
			},
			label: {
				type: String,
			},
			type: {
				type: String,
				default: "text"
			},
			value: {
				type: [String, Number],
			},
		},
		methods: {
			handleInput(event) {
				this.resize();
				this.$emit('input', event.target.value);
			},
			resize() {
				this.$refs.textarea.style.height = "auto";
				this.$refs.textarea.style.height = `${this.$refs.textarea.scrollHeight + 2}px`;
			}
		},
		mounted() {
			this.resize();
		},
	};
</script>

<style lang="scss">
	.FormTextarea__input {
		display: block;
		overflow-y: auto;
		resize: none;
		width: 100%;
		max-height: calc(5 * var(--baseline) + 2 * 12px);
		padding: 10px;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		border: 1px solid lightgray;
		border-radius: 5px;
	}
</style>
