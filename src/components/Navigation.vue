<template>
	<nav class="Navigation">
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
	</nav>
</template>

<style lang="scss">
	.navigation__list {
		list-style: none;
	}

	.navigation__item {
		line-height: var(--baseline);
	}

	.navigation__link {
		text-decoration: none;
		color: #000;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
</style>
