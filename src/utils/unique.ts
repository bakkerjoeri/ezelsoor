export default function unique(array: any[]) {
	return array.reduce((uniqueArray, entry) => {
		if (uniqueArray.includes(entry)) {
			return uniqueArray;
		}

		return [
			...uniqueArray,
			entry,
		];
	}, []);
}
