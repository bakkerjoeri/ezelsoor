<template>
	<div class="App">
		<Navigation class="App__navigation"/>
		<BookmarkUrlForm
			class="App__menubar"
			@submit="addNewBookmark"
		/>
		<RouterView class="App__main"></RouterView>
	</div>
</template>

<script>
	import Navigation from './components/Navigation.vue';
	import BookmarkUrlForm from './components/BookmarkUrlForm.vue';

	export default {
		name: 'app',
		methods: {
			addNewBookmark(newBookmark) {
				this.$store.commit('addBookmark', newBookmark);
			},
		},
		components: {
			Navigation,
			BookmarkUrlForm,
		},
		beforeCreate() {
			this.$store.subscribe((mutation, state) => {
				localStorage.setItem('state', JSON.stringify(state));
			});

			this.$store.commit('fetch');
		}
	}
</script>

<style lang="scss">
	@import './styles/base.scss';
	@import './styles/debug-baseline.scss';

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		// @include debug-baseline(var(--baseline));
		font-size: var(--font-size-body);
		line-height: var(--baseline);
		font-family: sans-serif;
	}

	h2 {
		line-height: calc(2 * var(--baseline));
	}

	.App {
		display: grid;
		max-width: 800px;
		padding: var(--baseline);
		margin: 0 auto;
		grid-template-columns: max-content 1fr;
		grid-template-rows: calc(2 * var(--baseline)) 1fr;
		grid-gap: var(--baseline);
	}

	.App__menubar {
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		padding-left: 10px;
		padding-right: 10px;
	}

	.App__navigation {
		grid-column: 1 / span 1;
		grid-row: 2 / -1;
		padding-left: 10px;
		padding-right: 10px;
	}

	.App__main {
		grid-column: span 1 / -1;
		grid-row: 2 / -1;
		padding-left: 10px;
		padding-right: 10px;
	}
</style>
