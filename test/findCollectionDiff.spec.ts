import { findCollectionDiff } from "./../src/utils/findCollectionDiff";

describe("findCollectionDiff", () => {
	test("tells you when documents are added", () => {
		const a = [{ id: "1" }];
		const b = [...a, { id: "2" }];

		expect(findCollectionDiff(a, b)).toEqual([
			{
				id: "2",
				operation: "added",
				data: { id: "2" },
			},
		]);
	});

	test("tells you when documents are modified", () => {
		const a = [{ id: "1" }, { id: "2" }, { id: "3", name: "Joeri" }];
		const b = a.map((doc) => {
			if (doc.id === "3") {
				return {
					...doc,
					name: "Kees",
				};
			}

			return doc;
		});

		expect(findCollectionDiff(a, b)).toEqual([
			{
				id: "3",
				operation: "modified",
				data: { id: "3", name: "Kees" },
			},
		]);
	});

	test("tells you when documents are removed", () => {
		const a = [{ id: "1" }, { id: "2" }, { id: "3" }];
		const b = a.filter((doc) => {
			return doc.id !== "1";
		});

		expect(findCollectionDiff(a, b)).toEqual([
			{
				id: "1",
				operation: "removed",
				data: { id: "1" },
			},
		]);
	});
});
