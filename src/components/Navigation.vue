<template>
	<nav class="Navigation">
		<h2 class="Navigation__sectionTitle">Menu</h2>

		<div class="Navigation__section">
			<ul class="Navigation__list">
				<li
					v-if="$store.getters.isLoggedIn"
					class="Navigation__item"
				>
					<Button @click="handleClickLogout">Log out</Button>
				</li>

				<li
					v-if="!$store.getters.isLoggedIn"
					class="Navigation__item"
				>
					<router-link
						class="Navigation__link"
						to="/login"
						@click.native="$emit('close')"
					>
						Log in
					</router-link>
				</li>

				<li
					v-if="!$store.getters.isLoggedIn"
					class="Navigation__item"
				>
					<router-link
						class="Navigation__link"
						to="/signup"
						@click.native="$emit('close')"
					>
						Sign up
					</router-link>
				</li>
			</ul>
		</div>

		<div class="Navigation__section">
			<ul class="Navigation__list">
				<li
					v-for="(menuItem, index) in menuItems"
					class="Navigation__item"
					:key="index"
				>
					<router-link
						class="Navigation__link"
						:to="menuItem.route"
						@click.native="$emit('close')"
					>
						{{ menuItem.name }}
					</router-link>
				</li>
			</ul>
		</div>

		<div class="Navigation__section" v-if="Object.keys(orderedTagCount).length">
			<h2 class="Navigation__sectionTitle">Tags</h2>

			<ul class="Navigation__list">
				<li
					class="Navigation__item"
					v-for="([tag, amount], index) in Object.entries(orderedTagCount)"
					:key="index"
				>
					<router-link
						class="Navigation__link"
						:to="{
							name: 'tag',
							params: { tagName: tag }
						}"
						@click.native="$emit('close')"
					>{{ tag }}</router-link>
					<span class="TagCount"> &middot; {{ amount }}</span>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	import Button from './Button.vue';
	import { auth } from './../utility/firebase.js';

	export default {
		components: {
			Button,
		},
		data: function() {
			return {
				menuItems: [
					{ name: 'Home', route: '/' },
					{ name: 'Read later', route: '/toread' },
					{ name: 'Favorites', route: '/favorites' },
					{ name: 'Archive', route: '/archive' },
				],
			};
		},
		computed: {
			tagCount() {
				return this.$store.getters.tagCount;
			},
			orderedTagCount() {
				const tagCount = this.tagCount;

				return Object.keys(tagCount).sort().reduce((orderedTagCount, tagName) => {
					return {
						...orderedTagCount,
						[tagName]: tagCount[tagName],
					}
				}, {});
			}
		},
		methods: {
			handleClickLogout() {
				auth.signOut();
			},
		},
	};
</script>

<style lang="scss">
	.Navigation {
		overflow-y: scroll;
		height: 100%;
		padding-right: var(--gap);
		padding-left: var(--gap);
	}

	.Navigation__section + .Navigation__section {
		margin-top: var(--baseline);
	}

	.Navigation__sectionTitle {
		font-size: var(--font-size-body);
		line-height: calc(2 * var(--baseline));
	}

	.Navigation__list {
		list-style: none;
	}

	.Navigation__item {
		line-height: var(--baseline);
		white-space: nowrap;
	}

	.Navigation__link {
		text-decoration: none;
		color: var(--color-text);

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	.TagCount {
		color: lightgray;
	}
</style>
