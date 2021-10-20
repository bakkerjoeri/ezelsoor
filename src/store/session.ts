import { derived, readable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../utils/firebase";

export const loggedInUserId = readable<string | null | undefined>(
	undefined,
	(set) => {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				set(user.uid);
			} else if (isLoggedIn) {
				set(null);
			}
		});
	}
);
export const isLoadingAuth = derived(
	loggedInUserId,
	(value) => value === undefined
);
export const isLoggedIn = derived(
	loggedInUserId,
	(value) => typeof value === "string"
);
