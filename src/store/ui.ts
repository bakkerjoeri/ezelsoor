import { writable } from "svelte/store";

interface EntityReference {
	type: "bookmark" | "list";
	id: string;
}

export const entityBeingEdited = writable<EntityReference | null>(null);
