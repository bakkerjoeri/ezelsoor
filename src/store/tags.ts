import { Readable, derived } from "svelte/store";
import { removeDiacretics } from "../utils/removeDiacretics";
import { compare, sortObjects } from "../utils/sorting";
import { activeBookmarks } from "./bookmarks";
import type { SortOrder } from "../utils/sorting";

export type TagSortBy = "name" | "amount";

export const tagCount: Readable<{ [tagName: string]: number }> = derived(
	activeBookmarks,
	(bookmarks) => {
		return bookmarks.reduce((tags, bookmark) => {
			return bookmark.tags.reduce((tags, tag) => {
				return {
					...tags,
					[tag]: tags.hasOwnProperty(tag) ? tags[tag] + 1 : 1,
				};
			}, tags);
		}, {});
	}
);

export function doesTagMatchQuery(tagName: string, query: string) {
	const normalizedQuery = removeDiacretics(query.toLowerCase());
	const normalizedTagName = removeDiacretics(tagName.toLowerCase());

	return normalizedQuery.split(" ").every((queryPart) => {
		return normalizedTagName.indexOf(queryPart) >= 0;
	});
}

export function sortTagCount(
	tagCount: [tagName: string, amount: number][],
	sortBy: TagSortBy,
	sortOrder: SortOrder
) {
	if (sortBy === "name") {
		return sortObjects(tagCount, 0, sortOrder);
	}

	if (sortBy === "amount") {
		return [...tagCount].sort(
			([tagNameA, bookmarkCountA], [tagNameB, bookmarkCountB]) => {
				const resultForAmount = compare(
					bookmarkCountA,
					bookmarkCountB,
					sortOrder
				);

				if (resultForAmount !== 0) {
					return resultForAmount;
				}

				return compare(tagNameA, tagNameB, "ascending");
			}
		);
	}

	return tagCount;
}
