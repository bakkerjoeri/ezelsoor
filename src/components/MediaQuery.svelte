<script lang="ts">
	import { mediaquery } from "../store/mediaquery";

	export let query: string;

	let matches = mediaquery(query);
</script>

<slot matches={$matches} />
