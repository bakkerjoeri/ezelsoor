export default function unique(array) {
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
