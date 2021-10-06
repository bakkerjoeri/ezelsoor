import { writable } from "svelte/store";
import { matches } from "./mediaquery";

interface EntityReference {
	type: "bookmark" | "list";
	id: string;
}

export const entityBeingEdited = writable<EntityReference | null>(null);
export const isNavigationOpen = writable<boolean>(
	matches("(min-width: 981px)")
);
