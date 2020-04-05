export function searchBookmarks(bookmarks, query) {
	return bookmarks.filter((bookmark) => doesBookmarkMatchQuery(bookmark, query));
}

export function doesBookmarkMatchQuery(bookmark, query) {
	const normalizedQuery = query.toLowerCase();

	const normalizedBookmarkTitle = bookmark.title.toLowerCase();
	const normalizedSummary = bookmark.summary.toLowerCase();
	const normalizedTags = bookmark.tags.join().toLowerCase();

	return normalizedQuery.split(' ').every((queryPart) => {
		return normalizedBookmarkTitle.indexOf(queryPart) >= 0 ||
			normalizedSummary.indexOf(queryPart) >= 0 ||
			normalizedTags.indexOf(queryPart) >= 0;
	});
}
