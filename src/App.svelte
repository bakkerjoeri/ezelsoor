<script lang="ts">
	import { navigate, Route, Router } from "svelte-routing";
	import HomePage from "./pages/HomePage.svelte";
	import TagPage from "./pages/TagPage.svelte";
	import ListPage from "./pages/ListPage.svelte";
	import FilterListPage from "./pages/FilterListPage.svelte";
	import ToReadPage from "./pages/ToReadPage.svelte";
	import FavoritesPage from "./pages/FavoritesPage.svelte";
	import ArchivePage from "./pages/ArchivePage.svelte";
	import { filterLists, hasFilterList } from "./store/filters";
	import LoginPage from "./pages/LoginPage.svelte";
	import SignupPage from "./pages/SignupPage.svelte";
	import SettingsPage from "./pages/SettingsPage.svelte";
	import { preferredColorScheme } from "./store/ui";
	import { lists } from "./store/lists";

	$: {
		document.body.classList.remove("color-scheme-light");
		document.body.classList.remove("color-scheme-dark");

		if ($preferredColorScheme === "light") {
			document.body.classList.add("color-scheme-light");
		}

		if ($preferredColorScheme === "dark") {
			document.body.classList.add("color-scheme-dark");
		}
	}
</script>

<Router>
	<Route path="/">
		<HomePage />
	</Route>

	<Route path="/login">
		<LoginPage />
	</Route>

	<Route path="/signup">
		<SignupPage />
	</Route>

	<Route path="/settings">
		<SettingsPage />
	</Route>

	<Route path="/toread">
		<ToReadPage />
	</Route>

	<Route path="/favorites">
		<FavoritesPage />
	</Route>

	<Route path="/archive">
		<ArchivePage />
	</Route>

	<Route path="/list/:listId" let:params>
		{#if $lists.some((list) => list.id === params.listId)}
			<ListPage listId={params.listId} />
		{/if}
	</Route>

	<Route path="/filter/:filterListId" let:params>
		{#if $filterLists.some((filterList) => filterList.id === params.filterListId)}
			<FilterListPage filterListId={params.filterListId} />
		{/if}
	</Route>

	<Route path="/tag/:tagName" let:params>
		<TagPage tagName={params.tagName} />
	</Route>
</Router>
