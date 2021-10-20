export type SortOrder = "ascending" | "descending";

export function compare(
	a: any,
	b: any,
	sortOrder: SortOrder = "ascending"
): number {
	const sortFactor = getSortFactor(sortOrder);

	if (b > a) {
		return sortFactor;
	}

	if (b < a) {
		return -1 * sortFactor;
	}

	return 0;
}

export function sortObjects<TObject>(
	objects: TObject[],
	key: keyof TObject,
	sortOrder: SortOrder = "ascending"
): TObject[] {
	return [...objects].sort((a, b) => {
		return compare(a[key], b[key], sortOrder);
	});
}

function getSortFactor(sortOrder: SortOrder): -1 | 1 {
	if (sortOrder === "ascending") {
		return -1;
	}

	if (sortOrder === "descending") {
		return 1;
	}

	throw new Error(
		`\`sortOrder\` should be either "descending" or "ascending", but got "${sortOrder}" instead.`
	);
}
