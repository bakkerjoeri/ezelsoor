<script lang="ts">
	import { isLoggedIn } from "../store/session";
	import { tagCount } from "./../store/bookmarks";
	import NavigationLink from "./NavigationLink.svelte";

	$: sortedTags = Object.entries($tagCount).sort(([tagNameA], [tagNameB]) => {
		if (tagNameA > tagNameB) {
			return 1;
		}

		if (tagNameA < tagNameB) {
			return -1;
		}

		return 0;
	});
</script>

<ul class="navigation__list">
	{#if !$isLoggedIn}
		<li class="navigation__item">
			<NavigationLink to="/login">Log in</NavigationLink>
		</li>
	{/if}

	<li class="navigation__item">
		<NavigationLink to="/">Home</NavigationLink>
	</li>

	<li class="navigation__item">
		<NavigationLink to="/toread">Read later</NavigationLink>
	</li>

	<li class="navigation__item">
		<NavigationLink to="/favorites">Favorites</NavigationLink>
	</li>

	<li class="navigation__item">
		<NavigationLink to="/archive">Archive</NavigationLink>
	</li>
</ul>

<h2 class="navigation__heading">Tags</h2>

<ul class="navigation__list">
	{#each sortedTags as [tagName, tagAmount] (tagName)}
		<li class="navigation__item">
			<NavigationLink to={`/tag/${tagName}`}>
				{tagName}
			</NavigationLink>

			&middot; {tagAmount}
		</li>
	{/each}
</ul>

<style lang="scss">
	.navigation__list {
		&:not(:last-child) {
			margin-bottom: var(--baseline);
		}
	}

	.navigation__heading {
		font-size: var(--font-size-body);
		line-height: calc(2 * var(--baseline));
	}

	.navigation__item {
		font-size: var(--font-size-body);
		line-height: var(--baseline);
	}
</style>
