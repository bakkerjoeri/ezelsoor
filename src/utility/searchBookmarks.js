import { removeDiacretics } from './removeDiacretics.js';

export function searchBookmarks(bookmarks, query) {
	return bookmarks.filter((bookmark) => doesBookmarkMatchQuery(bookmark, query));
}

export function doesBookmarkMatchQuery(bookmark, query) {
	const normalizedQuery = removeDiacretics(query.toLowerCase());

	const normalizedBookmarkTitle = removeDiacretics(bookmark.title.toLowerCase());
	const normalizedSummary = removeDiacretics(bookmark.summary.toLowerCase());
	const normalizedTags = removeDiacretics(bookmark.tags.join().toLowerCase());

	return normalizedQuery.split(' ').every((queryPart) => {
		return normalizedBookmarkTitle.indexOf(queryPart) >= 0 ||
			normalizedSummary.indexOf(queryPart) >= 0 ||
			normalizedTags.indexOf(queryPart) >= 0 ||
			bookmark.url.indexOf(queryPart) > 0;
	});
}
