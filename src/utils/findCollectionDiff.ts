import { isEqual } from "lodash-es";

interface ObjectWithId {
	id: string;
	[key: string]: any;
}

interface Diff<Item extends ObjectWithId> {
	id: string;
	operation: "added" | "removed" | "modified";
	data: Item;
}

export function findCollectionDiff<Item extends ObjectWithId>(
	oldCollection: Item[],
	newCollection: Item[]
): Diff<Item>[] {
	const diffs: Diff<Item>[] = [];

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

export function findCollectionDiffDeep<Item extends ObjectWithId>(
	oldCollection: Item[],
	newCollection: Item[]
): Diff<Item>[] {
	const diffs: Diff<Item>[] = [];

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
			const oldDoc = oldCollection.find((doc) => doc.id === newDoc.id);
			const documentWasModified = !isEqual(newDoc, oldDoc);

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
