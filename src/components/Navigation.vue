<template>
	<nav class="Navigation">
		<div class="Navigation__section">
			<h2 class="Navigation__header">Menu</h2>

			<ul class="Navigation__list">
				<li class="Navigation__item">
					<router-link class="Navigation__link" to="/">Home</router-link>
				</li>
				<li class="Navigation__item">
					<router-link class="Navigation__link" to="/toread">Read later</router-link>
				</li>
				<li class="Navigation__item">
					<router-link class="Navigation__link" to="/favorites">Favorites</router-link>
				</li>
				<li class="Navigation__item">
					<router-link class="Navigation__link" to="/archive">Archive</router-link>
				</li>
			</ul>
		</div>

		<div class="Navigation__section" v-if="Object.keys(orderedTagCount).length">
			<h2 class="Navigation__header">Tags</h2>

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
					>
						{{ tag }}
					</router-link>
					<span class="TagCount">&middot; {{ amount }}</span>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	export default {
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
	}
</script>

<style lang="scss">
	.Navigation__header {
		font-size: var(--font-size-body);
		// line-height: var(--baseline);
	}

	.Navigation__list {
		list-style: none;
		margin-bottom: var(--baseline);
	}

	.Navigation__item {
		line-height: var(--baseline);
	}

	.Navigation__link {
		text-decoration: none;
		color: #000;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	.TagCount {
		color: lightgray;
	}
</style>
