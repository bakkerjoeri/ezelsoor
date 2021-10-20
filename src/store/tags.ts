import { Readable, derived } from "svelte/store";
import { removeDiacretics } from "../utils/removeDiacretics";
import { activeBookmarks } from "./bookmarks";

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

export type TagSortBy = "name" | "amount";

export function sortTagCount(
	tagCount: [tagName: string, amount: number][],
	sortBy: TagSortBy,
	sortOrder: "ascending" | "descending"
) {
	const sortFactor = sortOrder === "ascending" ? 1 : -1;
	if (sortBy === "name") {
		return [...tagCount].sort(([tagNameA], [tagNameB]) => {
			if (tagNameB > tagNameA) {
				return sortFactor;
			}

			if (tagNameB < tagNameA) {
				return sortFactor * -1;
			}

			return 0;
		});
	}

	if (sortBy === "amount") {
		return [...tagCount].sort(
			([tagNameA, bookmarkCountA], [tagNameB, bookmarkCountB]) => {
				if (bookmarkCountB > bookmarkCountA) {
					return sortFactor;
				}

				if (bookmarkCountB < bookmarkCountA) {
					return sortFactor * -1;
				}

				if (tagNameA > tagNameB) {
					return 1;
				}

				if (tagNameA < tagNameB) {
					return -1;
				}

				return 0;
			}
		);
	}

	return tagCount;
}
