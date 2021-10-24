<script lang="ts">
	import {
		activeBookmarks,
		bookmarks,
		createNewBookmark,
	} from "../store/bookmarks";
	import { entityBeingEdited } from "../store/ui";
	import BookmarkPage from "./BookmarkPage.svelte";

	export let tagName: string;

	let actions = [{ label: "Create here", callback: onClickAddHere }];

	$: bookmarksWithTag = $activeBookmarks.filter((bookmark) =>
		bookmark.tags.includes(tagName)
	);

	function onClickAddHere() {
		const newBookmark = createNewBookmark({
			tags: [tagName],
		});
		bookmarks.add(newBookmark);
		$entityBeingEdited = {
			id: newBookmark.id,
			type: "bookmark",
		};
	}
</script>

<BookmarkPage title={`#${tagName}`} bookmarks={bookmarksWithTag} {actions} />
