<template>
	<nav class="Navigation">
		<h2 class="Navigation__sectionHeader">Menu</h2>
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

		<h2 class="Navigation__sectionHeader">Tags</h2>
		<ul class="Navigation__list" v-if="allTags.length">
			<li
				class="Navigation__item"
				v-for="(tag, index) in allTags"
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
			</li>

		</ul>
	</nav>
</template>

<script>
	export default {
		computed: {
			allTags() {
				return this.$store.getters.allTags;
			},
		},
	}
</script>

<style lang="scss">
	.Navigation__sectionHeader {
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
</style>
