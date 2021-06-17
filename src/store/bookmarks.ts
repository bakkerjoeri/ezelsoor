import uuid from '@bakkerjoeri/uuid';

export interface Bookmark {
	id: string;
	url: string;
	title: string;
	notes: string;
	tags: string[];
	isFavorite: boolean;
	isArchived: boolean;
	isToRead: boolean;
	dateCreated: number;
}

export function createNewBookmark(properties: Partial<Bookmark>): Bookmark {
	return {
		id: uuid(),
		url: '',
		title: '',
		notes: '',
		tags: [],
		isFavorite: false,
		isArchived: false,
		isToRead: false,
		dateCreated: Date.now().valueOf(),
		...properties,
	};
}
