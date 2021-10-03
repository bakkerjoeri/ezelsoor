import { writable, get, StartStopNotifier } from "svelte/store";
import type { Writable } from "svelte/store";

export function createLocalStore<TValue>(
	key: string,
	initial?: TValue,
	start?: StartStopNotifier<TValue>
): Writable<TValue> {
	if (initial !== undefined && localStorage.getItem(key) === null) {
		localStorage.setItem(key, JSON.stringify(initial));
	}

	const savedValue = JSON.parse(localStorage.getItem(key));
	const store = writable<TValue>(savedValue, start);
	const { subscribe, set } = store;

	return {
		subscribe,
		set: (value: TValue) => {
			save(key, value);
			set(value);
		},
		update: (updater: (value: TValue) => TValue) => {
			const value = updater(get(store));
			save(key, value);
			set(value);
		},
	};
}

function save(key: string, value: any): void {
	if (typeof localStorage === "undefined") {
		return;
	}

	localStorage.setItem(key, JSON.stringify(value));
}
