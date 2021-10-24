<script lang="ts">
	import { filterLists } from "../store/filters";
	import { isLoggedIn, logout } from "../store/session";
	import { tagCount } from "../store/tags";
	import { showReadLaterCount } from "../store/ui";
	import { bookmarksToRead } from "./../store/bookmarks";
	import Button from "./Button.svelte";
	import FilterListNavigation from "./FilterListNavigation.svelte";
	import ListNavigation from "./ListNavigation.svelte";
	import NavigationItem from "./NavigationItem.svelte";
	import NavigationLink from "./NavigationLink.svelte";
	import NavigationSection from "./NavigationSection.svelte";
	import TagNavigation from "./TagNavigation.svelte";

	$: tags = Object.entries($tagCount);
</script>

<nav>
	{#if !$isLoggedIn}
		<NavigationSection>
			<NavigationItem on:navigate to="/login">Log in</NavigationItem>
			<NavigationItem on:navigate to="/signup">Sign up</NavigationItem>
		</NavigationSection>
	{/if}

	<NavigationSection>
		<NavigationItem on:navigate to="/">Home</NavigationItem>
		<NavigationItem
			on:navigate
			to="/toread"
			count={$showReadLaterCount ? $bookmarksToRead.length : undefined}
		>
			Read later
		</NavigationItem>
		<NavigationItem on:navigate to="/favorites">Favorites</NavigationItem>
		<NavigationItem on:navigate to="/archive">Archive</NavigationItem>
	</NavigationSection>

	<FilterListNavigation filterLists={$filterLists} on:navigate />

	{#if tags.length}
		<TagNavigation {tags} on:navigate />
	{/if}
</nav>

{#if $isLoggedIn}
	<footer class="navigation__footer">
		<NavigationLink to="settings" on:navigate>Settings</NavigationLink>
		<Button
			on:click={() => {
				logout();
			}}
			variant="text">Log out</Button
		>
	</footer>
{/if}

<style lang="scss">
	nav {
		margin: var(--baseline);
	}

	.navigation__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		bottom: 0;
		height: calc(2 * var(--baseline));
		padding-left: var(--baseline);
		padding-right: var(--baseline);
		border-top: 1px solid var(--border-color-ui-secondary);
		background-color: var(--background-color-ui-primary);
	}
</style>
