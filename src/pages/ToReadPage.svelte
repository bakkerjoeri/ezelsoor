<script lang="ts">
	import {
		bookmarks,
		bookmarksToRead,
		createNewBookmark,
	} from "../store/bookmarks";
	import { localStore } from "../store/localStore";
	import BookmarkPage from "./BookmarkPage.svelte";
	import type { SortOrder } from "../utils/sorting";
	import { entityBeingEdited } from "../store/ui";

	let sortOrder = localStore<SortOrder>("toReadPageSortOrder", "descending");
	let actions = [{ label: "Create here", callback: onClickAddHere }];

	function onClickAddHere() {
		const newBookmark = createNewBookmark({
			isToRead: true,
		});
		bookmarks.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<BookmarkPage
	title="Read later"
	bookmarks={$bookmarksToRead}
	bind:sortOrder={$sortOrder}
	{actions}
/>
