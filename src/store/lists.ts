import { createLocalStore } from "./localStore";
import type { Bookmark } from "./bookmarks";

export interface List {
	id: string;
	title: string;
	description: string;
	bookmarks: Bookmark["id"];
}

export const lists = createLocalStore<List[]>("lists", []);
