import { derived, get, readable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../utils/firebase";

type LoggedInState = "loading" | "loggedIn" | "loggedOut";

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

export const loggedInState = derived(loggedInUserId, (value) => {
	if (value === null) {
		return "loggedOut";
	}

	if (typeof value === "string") {
		return "loggedIn";
	}

	return "loading";
});

const stateHistory: LoggedInState[] = [];

export const previousLoggedInState = readable<LoggedInState>(
	"loading",
	(set) => {
		return loggedInState.subscribe((newState) => {
			if (stateHistory.length === 0) {
				stateHistory.push(get(previousLoggedInState));
			}

			const previousState = stateHistory[stateHistory.length - 1];

			if (previousState !== newState) {
				set(previousState);
				stateHistory.push(newState);
			}

			console.log(stateHistory);
		});
	}
);

export function logout() {
	if (auth) {
		auth.signOut();
	}
}
