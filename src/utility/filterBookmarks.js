import { doesBookmarkMatchQuery } from './searchBookmarks.js';

export default function filterBookmarks(bookmarks, filters) {
	return bookmarks.filter(bookmark => {
		return filters.every(filter => {
			if (filter.type === 'matchesSearchTerms') {
				if (!filter.hasOwnProperty('query')) {
					throw Error('Filter of type "matchesSearchTerms" is missing "query" parameter.');
				}

				return doesBookmarkMatchQuery(bookmark, filter.query);
			}

			if (filter.type === 'fromSource') {
				if (!filter.hasOwnProperty('source')) {
					throw Error('Filter of type "fromSource" is missing "source" parameter.');
				}

				if (!bookmark.url) {
					return false;
				}

				console.log(new URL(bookmark.url).host);
				console.log(filter.source);
				console.log(new URL(bookmark.url).host.indexOf(filter.source));

				return new URL(bookmark.url).host.indexOf(filter.source) >= 0;
			}

			if (filter.type === 'isFavorite') {
				return bookmark.isFavorite;
			}

			if (filter.type === 'isToRead') {
				return bookmark.isToRead;
			}

			if (filter.type === 'isArchived') {
				return bookmark.isArchived;
			}

			if (filter.type === 'taggedWithAllOf') {
				if (!filter.tags) {
					throw Error('Filter of type "taggedWithAllOf" is missing "tags" parameter.');
				}

				if (bookmark.tags.length === 0) {
					return false;
				}

				return filter.tags.split(' ').every(tag => {
					return bookmark.tags.includes(tag);
				});
			}

			if (filter.type === 'taggedWithAnyOf') {
				if (!filter.tags) {
					throw Error('Filter of type "taggedWithAnyOf" is missing "tags" parameter.');
				}

				if (bookmark.tags.length === 0) {
					return false;
				}

				return filter.tags.split(' ').some(tag => {
					return bookmark.tags.includes(tag);
				});
			}

			if (filter.type === 'untagged') {
				return bookmarks.tags.length === 0;
			}

			return false;
		})
	});
}
