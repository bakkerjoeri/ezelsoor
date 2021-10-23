import { mergeCollections } from "../src/utils/mergeCollections";

describe("mergeCollections", () => {
	test("adds new items", () => {
		const a = [{ id: "1" }];
		const b = [{ id: "2" }];

		expect(mergeCollections(a, b)).toEqual([{ id: "1" }, { id: "2" }]);
	});

	test("merges existing items", () => {
		const a = [{ id: "1" }, { id: "2", name: "old" }];
		const b = [{ id: "2", name: "new" }];

		expect(mergeCollections(a, b)).toEqual([
			{ id: "1" },
			{ id: "2", name: "new" },
		]);
	});

	test("does both", () => {
		const a = [{ id: "1" }, { id: "2", name: "old" }];
		const b = [{ id: "2", name: "new" }, { id: "3" }];

		expect(mergeCollections(a, b)).toEqual([
			{ id: "1" },
			{ id: "2", name: "new" },
			{ id: "3" },
		]);
	});
});
