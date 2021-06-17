<div class="App">
	<main>
		<BookmarkList bookmarks={bookmarks}/>
	</main>
</div>

<script lang="ts">
import BookmarkList from "./BookmarkList.svelte";
import { createNewBookmark } from "./store/bookmarks";

const bookmarks = [
	createNewBookmark({ title: 'test1' }),
]
</script>

<style lang="scss">
	.App {
		grid-column-gap: 13px;
		grid-template-columns: min-content 1fr;
	}
</style>
