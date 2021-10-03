import { database } from "./../utils/firebase";
import { get, writable, Writable } from "svelte/store";
import { loggedInUserId } from "./session";

export function createFireStore(collection: any): Writable<any[]> {
	return writable([], (set) => {
		loggedInUserId.subscribe(async (userId) => {
			if (!userId) {
				return;
			}

			const bookmarks = await fetchBookmarksForUser(get(loggedInUserId));

			set(bookmarks);
		});
	});
}

async function fetchBookmarksForUser(userId: string) {
	const querySnapshot = await database
		.collection("users")
		.doc(userId)
		.collection("bookmarks")
		.get();

	const bookmarks = [];

	querySnapshot.forEach((doc) => {
		bookmarks.push(doc.data());
	});

	return bookmarks;
}
