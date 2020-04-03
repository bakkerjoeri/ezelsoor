export default function sortBookmarks(bookmarks, property = 'dateCreated', order = 'descending') {
	return [...bookmarks].sort((a, b) => {
		if (a.hasOwnProperty(property) && b.hasOwnProperty(property)) {
			if (order === 'ascending') {
				return a[property] - b[property];
			}

			if (order === 'descending') {
				return b[property] - a[property];
			}
		}

		return 0;
	});
}
