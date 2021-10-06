<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import HomePage from "./pages/HomePage.svelte";
	import TagPage from "./pages/TagPage.svelte";
	import ListPage from "./pages/ListPage.svelte";
	import FilterListPage from "./pages/FilterListPage.svelte";
	import ToReadPage from "./pages/ToReadPage.svelte";
	import FavoritesPage from "./pages/FavoritesPage.svelte";
	import ArchivePage from "./pages/ArchivePage.svelte";
	import { hasFilterList } from "./store/filters";
</script>

<Router>
	<Route path="/">
		<HomePage />
	</Route>

	<Route path="toread">
		<ToReadPage />
	</Route>

	<Route path="favorites">
		<FavoritesPage />
	</Route>

	<Route path="archive">
		<ArchivePage />
	</Route>

	<Route path="/list/:listId" let:params>
		<ListPage listId={params.listId} />
	</Route>

	<Route path="/filter/:filterListId" let:params>
		{#if hasFilterList(params.filterListId)}
			<FilterListPage filterListId={params.filterListId} />
		{/if}
	</Route>

	<Route path="/tag/:tagName" let:params>
		<TagPage tagName={params.tagName} />
	</Route>
</Router>
