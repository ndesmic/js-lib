import { getPermutations } from "../libs/combinatorics-tools.js";

describe("getPermutations", () => {
	it("gets all permutations", () => {
		const result = getPermutations([1,2,3]);
		expect(result[0]).toEqual([1, 2, 3]);
		expect(result[1]).toEqual([1, 3, 2]);
		expect(result[2]).toEqual([2, 1, 3]);
		expect(result[3]).toEqual([2, 3, 1]);
		expect(result[4]).toEqual([3, 1, 2]);
		expect(result[5]).toEqual([3, 2, 1]);
	});
});