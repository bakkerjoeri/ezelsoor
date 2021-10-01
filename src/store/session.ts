import { derived, writable } from "svelte/store";
import { auth } from "../utils/firebase";

export const loggedInUserId = writable<string | null>(null);
export const isLoggedIn = derived([loggedInUserId], (value) => value !== null);

auth.onAuthStateChanged(user => {
	if (user) {
		loggedInUserId.set(user.uid);
	} else if (isLoggedIn) {
		loggedInUserId.set(null);
	}
});
