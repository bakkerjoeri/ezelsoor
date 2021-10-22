import { writable } from "svelte/store";
import { localStore } from "./localStore";
import { matches } from "./mediaquery";

interface EntityReference {
	type: "bookmark" | "list" | "filterList";
	id: string;
}

export type ColorScheme = "system" | "light" | "dark";
export type TagSortBy = "name" | "amount";

export const entityBeingEdited = writable<EntityReference | null>(null);
export const isNavigationOpen = writable<boolean>(
	matches("(min-width: 1021px)")
);

export const showReadLaterCount = localStore("showReadLaterCount", true);
export const showTagCount = localStore("showTagCount", true);
export const preferredColorScheme = localStore<ColorScheme>(
	"preferredColorScheme",
	"system"
);

export const tagSortBy = localStore<TagSortBy>("tagSortBy", "amount");
