import { derived, get, Readable, readable } from "svelte/store";
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

export const loggedInState: Readable<LoggedInState> = derived(
	loggedInUserId,
	(value) => {
		if (value === null) {
			return "loggedOut";
		}

		if (typeof value === "string") {
			return "loggedIn";
		}

		return "loading";
	}
);

export const stateHistory = derived(
	loggedInState,
	(newState) => {
		const $stateHistory = get(stateHistory) as LoggedInState[];
		const currentState = $stateHistory[$stateHistory.length - 1];

		if (currentState === newState) {
			return $stateHistory;
		}

		return [...$stateHistory, newState];
	},
	[get(loggedInState)]
);

export const previousLoggedInState = derived(stateHistory, (value) => {
	if (value.length === 1) {
		return value[0];
	}

	return value[value.length - 2];
});

export function logout() {
	if (auth) {
		auth.signOut();
	}
}
