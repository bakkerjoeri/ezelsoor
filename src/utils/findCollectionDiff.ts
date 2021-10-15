interface Document {
	id: string;
	[key: string]: any;
}

type Collection = Document[];

interface Diff {
	id: string;
	operation: "added" | "removed" | "modified";
	data: Document;
}

export function findCollectionDiff(
	oldCollection: Collection,
	newCollection: Collection
): Diff[] {
	const diffs: Diff[] = [];

	const oldCollectionIds = oldCollection.map((document) => document.id);
	const newCollectionIds = newCollection.map((document) => document.id);

	newCollection.forEach((newDoc) => {
		const docAlreadyExisted = oldCollectionIds.includes(newDoc.id);

		if (!docAlreadyExisted) {
			diffs.push({
				id: newDoc.id,
				operation: "added",
				data: newDoc,
			});
		}

		if (docAlreadyExisted) {
			const documentWasModified = !oldCollection.includes(newDoc);

			if (documentWasModified) {
				diffs.push({
					id: newDoc.id,
					operation: "modified",
					data: newDoc,
				});
			}
		}
	});

	oldCollection.forEach((oldDoc) => {
		const docWasRemoved = !newCollectionIds.includes(oldDoc.id);

		if (docWasRemoved) {
			diffs.push({
				id: oldDoc.id,
				operation: "removed",
				data: oldDoc,
			});
		}
	});

	return diffs;
}
