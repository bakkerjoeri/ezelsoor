<template>
	<div class="App">
		<aside
			class="App__sidebar"
			:class="{ 'is-open': isMenuOpen }"
		>
			<Navigation v-if="isMenuOpen" @close="isMenuOpen = false" v-click-outside="() => isMenuOpen = false"/>
			<Navigation v-else/>
		</aside>

		<main
			class="App__main"
			:class="{ 'is-disabled': isMenuOpen && $mq === 'sm' }"
		>
			<RouterView/>
		</main>
	</div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
	components: {
		Navigation,
	},
	data: function() {
		return {
			isMenuOpen: false,
		};
	},
	computed: {
		shouldShowMenu() {
			if (this.$mq === 'sm') {
				return this.isMenuOpen;
			}

			return true;
		},
	},
	methods: {
		openMenu() {
			this.isMenuOpen = true;
		},
		closeMenu() {
			this.isMenuOpen = false;
		},
	},
	beforeCreate() {
		this.$store.subscribe((mutation, state) => {
			localStorage.setItem('state', JSON.stringify(state));
		});
	},
	mounted() {
		this.$root.$on('toggleMenu', () => {
			this.isMenuOpen = !this.isMenuOpen;
		});
	}
}
</script>

<style lang="scss">
	@import './styles/base.scss';

	html,
	body {
		height: 100%;
	}

	.App {
		--gap: calc(var(--baseline) / 2);

		display: grid;
		grid-template-columns: min-content 100%;
		grid-template-rows: 100%;

		overflow: hidden;
		height: 100%;

		@media (min-width: 640px) {
			--gap: var(--baseline);

			grid-column-gap: var(--gap);
			grid-template-columns: min-content 1fr;
		}
	}

	.App__main {
		padding-right: var(--gap);
		padding-left: var(--gap);

		@media (min-width: 640px) {
			padding-right: var(--gap);
			padding-left: 0;
		}
	}

	.App__sidebar {
		grid-column: 1;
		grid-row: 1 / -1;
		border-right: 1px solid lightgray;

		@media (max-width: 639px) {
			$sidebar-flyout-width: 75vw;

			overflow-x: hidden;
			width: $sidebar-flyout-width;
			transition: all .4s;

			&:not(.is-open) {
				width: 0;
				opacity: 0;

				> * {
					transform: translateX(-$sidebar-flyout-width);
				}
			}

			> * {
				width: $sidebar-flyout-width;
				transition: all .4s;
			}
		}

		@media (min-width: 640px) {
			width: 240px;
		}
	}

	.App__main {
		overflow-y: scroll;
		grid-column: 2;
		grid-row: 1 / -1;
		transition: opacity .2s;

		&.is-disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		> * {
			max-width: 720px;
			margin: 0 auto;
		}
	}
</style>
