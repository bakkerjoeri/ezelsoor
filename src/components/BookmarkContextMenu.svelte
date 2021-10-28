<script lang="ts">
	import { entityBeingEdited } from "../store/ui";

	export let id: string;
	export let url: string = "";
	export let title: string;
	export let isFavorite: boolean;
	export let isArchived: boolean;
	export let isToRead: boolean;

	function copyURL() {
		navigator.clipboard.writeText(url);
	}

	function copyTitle() {
		navigator.clipboard.writeText(title);
	}

	function addToFavorites() {}

	function removeFromFavorites() {}

	function archive() {}

	function unarchive() {}

	function markAsRead() {}

	function markAsToRead() {}

	function onClickEdit() {
		$entityBeingEdited = {
			type: "bookmark",
			id,
		};
	}

	function onClickManageLists() {
		console.log("Uh...");
	}
</script>

<ul>
	{#if url}
		<li>
			<a href={url} target="_blank" rel="noopener noreferrer">
				Open link
			</a>
		</li>

		<li>
			<button on:click={copyURL}>Copy link</button>
		</li>
	{/if}

	<li>
		<button on:click={copyTitle}>Copy title</button>
	</li>

	<li>
		<button on:click={onClickEdit}>Edit bookmark...</button>
	</li>

	<li>
		<button on:click={onClickManageLists}>Manage lists...</button>
	</li>

	<li>
		{#if isToRead}
			<button on:click={markAsRead}>Mark as read</button>
		{:else}
			<button on:click={markAsToRead}>Mark as to read</button>
		{/if}
	</li>

	<li>
		{#if isFavorite}
			<button on:click={removeFromFavorites}>Remove from favorites</button
			>
		{:else}
			<button on:click={addToFavorites}>Add to favorites</button>
		{/if}
	</li>

	<li>
		{#if isArchived}
			<button on:click={unarchive}>Unarchive</button>
		{:else}
			<button on:click={archive}>Archive</button>
		{/if}
	</li>
</ul>

<style lang="scss">
	ul {
		position: absolute;
	}
</style>
