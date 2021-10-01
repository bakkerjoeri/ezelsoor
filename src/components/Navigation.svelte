<script lang="ts">
	import { Link } from 'svelte-routing';
	import { tagCount } from './../store/bookmarks';

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

<ul class="Navigation__list">
	<li class="Navigation__item">
		<Link to="/login" class="Navigation__link">
			Log in
		</Link>
	</li>

	<li class="Navigation__item">
		<Link to="/" class="Navigation__link">
			Home
		</Link>
	</li>

	<li class="Navigation__item">
		<Link to="/toread" class="Navigation__link">
			Read later
		</Link>
	</li>

	<li class="Navigation__item">
		<Link to="/favorites" class="Navigation__link">
			Favorites
		</Link>
	</li>

	<li class="Navigation__item">
		<Link to="/archive" class="Navigation__link">
			Archive
		</Link>
	</li>
</ul>

<h2 class="Navigation__heading">Tags</h2>

<ul class="Navigation__list">
	{#each sortedTags as [tagName, tagAmount] (tagName)}
		<li class="Navigation__item">
			<Link to={`/tag/${tagName}`} class="Navigation__link">
				{tagName}
			</Link>

			&middot; {tagAmount}
		</li>
	{/each}
</ul>

<style lang="scss">
	.Navigation__list {
		&:not(:last-child) {
			margin-bottom: var(--baseline);
		}
	}

	.Navigation__heading {
		font-size: var(--font-size-body);
		line-height: var(--baseline);
	}

	:global(.Navigation__link) {
		color: inherit;
		text-decoration: none;
		font-size: var(--font-size-body);
		line-height: var(--baseline);
	}

	:global(.Navigation__link:hover),
	:global(.Navigation__link:focus) {
		text-decoration: underline;
	}

	:global(.Navigation__link[aria-current="page"]) {
		color: var(--color-highlight);
	}
</style>
