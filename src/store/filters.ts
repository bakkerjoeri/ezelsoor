import { derived, get, Readable } from "svelte/store";
import uuid from "@bakkerjoeri/uuid";
import { entityBeingEdited } from "./ui";
import { Bookmark, doesBookmarkMatchQuery } from "./bookmarks";
import { userCollectionStore } from "./firestore";

export interface FilterList {
	id: string;
	title: string;
	description: string;
	shouldIncludeArchived: boolean;
	filters: Filter[];
	createdAt: number;
}

export type Filter =
	| MatchesSearchTermsFilter
	| FromSourceFilter
	| HasSourceFilter
	| IsFavoriteFilter
	| IsToReadFilter
	| IsArchivedFilter
	| AndTagsFilter
	| OrTagsFilter
	| UntaggedFilter;

export type FilterWithValue =
	| MatchesSearchTermsFilter
	| FromSourceFilter
	| AndTagsFilter
	| OrTagsFilter;

export type FilterType = Filter["type"];

export interface MatchesSearchTermsFilter {
	type: "matchesSearchTerms";
	value: string;
}

export interface FromSourceFilter {
	type: "fromSource";
	value: string;
}

export interface HasSourceFilter {
	type: "hasSource";
}

export interface IsFavoriteFilter {
	type: "isFavorite";
}

export interface IsToReadFilter {
	type: "isToRead";
}

export interface IsArchivedFilter {
	type: "isArchived";
}

export interface AndTagsFilter {
	type: "andTags";
	value: string;
}

export interface OrTagsFilter {
	type: "orTags";
	value: string;
}

export interface UntaggedFilter {
	type: "untagged";
}

export const filterTypesWithValue = [
	"matchesSearchTerms",
	"fromSource",
	"andTags",
	"orTags",
];

export function doesFilterHaveValue(filter: Filter): filter is FilterWithValue {
	return filterTypesWithValue.includes(filter.type);
}

export const filterLists = userCollectionStore<FilterList>("filters");

export function hasFilterList(filterListId: FilterList["id"]): boolean {
	return get(filterLists).some(
		(filterList) => filterList.id === filterListId
	);
}

export function getFilterList(filterListId: FilterList["id"]): FilterList {
	const filterList = get(filterLists).find(
		(filterList) => filterList.id === filterListId
	);

	if (!filterList) {
		throw new Error(`Couldn't find filterList with ID ${filterListId}`);
	}

	return filterList;
}

export const filterListBeingEdited: Readable<FilterList | null> = derived(
	[filterLists, entityBeingEdited],
	([$filterLists, $entityBeingEdited]) => {
		if (!$entityBeingEdited) {
			return null;
		}

		if ($entityBeingEdited.type !== "filterList") {
			return null;
		}

		if (!hasFilterList($entityBeingEdited.id)) {
			return null;
		}

		return getFilterList($entityBeingEdited.id);
	}
);

export function createNewFilterList(
	properties: Partial<FilterList> = {}
): FilterList {
	return {
		id: uuid(),
		title: "",
		description: "",
		shouldIncludeArchived: false,
		filters: [],
		createdAt: Date.now().valueOf(),
		...properties,
	};
}

export function filterBookmarks(bookmarks: Bookmark[], filters: Filter[]) {
	return bookmarks.filter((bookmark) => {
		return filters.every((filter) => {
			if (filter.type === "matchesSearchTerms") {
				return doesBookmarkMatchQuery(bookmark, filter.value);
			}

			if (filter.type === "fromSource") {
				if (!bookmark.url) {
					return false;
				}

				return new URL(bookmark.url).host.indexOf(filter.value) >= 0;
			}

			if (filter.type === "hasSource") {
				return !!bookmark.url;
			}

			if (filter.type === "isFavorite") {
				return bookmark.isFavorite;
			}

			if (filter.type === "isToRead") {
				return bookmark.isToRead;
			}

			if (filter.type === "isArchived") {
				return bookmark.isArchived;
			}

			if (filter.type === "andTags") {
				if (bookmark.tags.length === 0) {
					return false;
				}

				return filter.value.split(" ").every((tag) => {
					return bookmark.tags.includes(tag);
				});
			}

			if (filter.type === "orTags") {
				if (bookmark.tags.length === 0) {
					return false;
				}

				return filter.value.split(" ").some((tag) => {
					return bookmark.tags.includes(tag);
				});
			}

			if (filter.type === "untagged") {
				return bookmark.tags.length === 0;
			}

			return false;
		});
	});
}
