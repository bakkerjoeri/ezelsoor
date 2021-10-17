import { writable } from "svelte/store";
import { createLocalStore } from "./localStore";
import { matches } from "./mediaquery";

interface EntityReference {
	type: "bookmark" | "list" | "filterList";
	id: string;
}

export type ColorScheme = "system" | "light" | "dark";
export type TagSortingMethod = "alphabetically" | "bookmarkCount";

export const entityBeingEdited = writable<EntityReference | null>(null);
export const isNavigationOpen = writable<boolean>(
	matches("(min-width: 1021px)")
);

export const showReadLaterCount = createLocalStore("showReadLaterCount", true);
export const showTagCount = createLocalStore("showTagCount", true);
export const preferredColorScheme = createLocalStore<ColorScheme>(
	"preferredColorScheme",
	"system"
);

export const tagSortingMethod = createLocalStore<TagSortingMethod>(
	"tagSortingMethod",
	"bookmarkCount"
);
