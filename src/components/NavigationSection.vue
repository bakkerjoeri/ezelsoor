<template>
	<div class="NavigationSection">
		<header
			v-if="title || collapsible"
			class="NavigationSection__header"
		>
			<h2 class="NavigationSection__title">
				{{ title }}
			</h2>

			<Row class="NavigationSection__actions">
				<slot name="actions"/>

				<Button
					v-if="collapsible && $slots.default"
					variant="text"
					size="small"
					@click="isSectionHidden = !isSectionHidden"
				>
					{{ isSectionHidden ? 'show' : 'hide' }}
				</Button>
			</Row>
		</header>

		<div
			v-if="!isSectionHidden"
			class="NavigationSection__content"
		>
			<slot/>
		</div>
	</div>
</template>

<script>
	import Button from './Button.vue';
	import Row from './Row.vue';

	export default {
		components: {
			Button,
			Row,
		},
		props: {
			collapsible: {
				type: Boolean,
			},
			title: {
				type: String,
			},
		},
		data() {
			return {
				isSectionHidden: false,
			}
		},
	};
</script>

<style lang="scss">
	.NavigationSection__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.NavigationSection__title {
		font-size: var(--font-size-body);
		line-height: calc(2 * var(--baseline));
	}
</style>
