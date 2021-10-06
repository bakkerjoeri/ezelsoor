import { derived, readable } from "svelte/store";
import { auth } from "../utils/firebase";

export const loggedInUserId = readable<string | null>(null, (set) => {
	auth.onAuthStateChanged((user) => {
		if (user) {
			set(user.uid);
		} else if (isLoggedIn) {
			set(null);
		}
	});
});

export const isLoggedIn = derived([loggedInUserId], (value) => value !== null);
