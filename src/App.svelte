<script lang="ts">
	import { Route, Router } from "svelte-routing";
	import Login from "./pages/Login.svelte";
	import HomePage from "./pages/HomePage.svelte";
	import TagPage from "./pages/TagPage.svelte";
	import ListPage from "./pages/ListPage.svelte";
	import ToReadPage from "./pages/ToReadPage.svelte";
	import FavoritesPage from "./pages/FavoritesPage.svelte";
	import ArchivePage from "./pages/ArchivePage.svelte";
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

	<Route path="/tag/:tagName" let:params>
		<TagPage tagName={params.tagName} />
	</Route>

	<Route path="/login">
		<Login />
	</Route>
</Router>
