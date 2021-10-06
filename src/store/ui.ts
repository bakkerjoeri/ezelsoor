import { writable } from "svelte/store";
import { matches } from "./mediaquery";

interface EntityReference {
	type: "bookmark" | "list" | "filterList";
	id: string;
}

export const entityBeingEdited = writable<EntityReference | null>(null);
export const isNavigationOpen = writable<boolean>(
	matches("(min-width: 1021px)")
);
