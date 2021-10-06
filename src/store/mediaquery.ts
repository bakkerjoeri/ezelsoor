import { readable, Readable } from "svelte/store";

export function mediaquery(query: string): Readable<boolean> {
	let mediaQueryList = window.matchMedia(query);

	return readable(mediaQueryList.matches, (set) => {
		function onMatchChange(event: MediaQueryListEvent) {
			set(event.matches);
		}

		mediaQueryList.addEventListener("change", onMatchChange);

		return () => {
			mediaQueryList.removeEventListener("change", onMatchChange);
		};
	});
}

export const isPhabletUp = mediaquery("(min-width: 641px)");
export const isTabletUp = mediaquery("(min-width: 981px)");

export function matches(query: string): boolean {
	let mediaQueryList = window.matchMedia(query);
	return mediaQueryList.matches;
}
