import { derived, readable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../utils/firebase";

export function logout() {
	if (auth) {
		auth.signOut();
	}
}

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

type LoggedInState = "loading" | "loggedIn" | "loggedOut";
let currentLoggedInState: LoggedInState = "loading";

export function onLoggedInStateChanged(
	handler: (
		current: LoggedInState,
		previous: LoggedInState,
		userId: string | null | undefined
	) => any
) {
	loggedInUserId.subscribe((value) => {
		if (value === null) {
			const newState: LoggedInState = "loggedOut";
			handler(newState, currentLoggedInState, value);
			currentLoggedInState = newState;
		} else if (typeof value === "string") {
			const newState: LoggedInState = "loggedIn";
			handler(newState, currentLoggedInState, value);
			currentLoggedInState = newState;
		}
	});
}
