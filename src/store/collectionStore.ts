import { writable } from "svelte/store";

interface ObjectWithId {
	id: string;
	[key: string]: any;
}

export function collectionStore<Item extends ObjectWithId>(
	baseStore = writable<Item[]>([])
) {
	const { subscribe, set, update } = baseStore;

	const add = (item: Item) => {
		update((collection) => {
			return [...collection, item];
		});
	};

	const patch = (id: string, newValue: Partial<Item>) => {
		update((collection) => {
			return collection.map((item) => {
				if (item.id !== id) {
					return item;
				}

				return {
					...item,
					...newValue,
				};
			});
		});
	};
	const remove = (id: string) => {
		update((collection) => {
			return collection.filter((item) => {
				return item.id !== id;
			});
		});
	};

	return { subscribe, set, update, add, patch, remove };
}
