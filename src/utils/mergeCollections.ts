interface ObjectWithId {
	id: string;
	[key: string]: any;
}

export function mergeCollections<Item extends ObjectWithId>(
	baseCollection: Item[],
	newCollection: Item[]
): Item[] {
	const merged = [...baseCollection, ...newCollection].reduce(
		(result, item) => {
			return {
				...result,
				[item.id]: item,
			};
		},
		{} as { [id: string]: Item }
	);

	return Object.values(merged);
}
