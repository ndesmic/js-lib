import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect";
import { vectorCompare } from "../../libs/sorting.js";

describe("vectorSort", () => {
	it("sorts by element", () => {
		const value = [
			[1, 1],
			[1, 0]
		].sort(vectorCompare());

		expect(value).toEqual([[1,0],[1,1]]);
	});
	it("sorts by element", () => {
		const value = [
			[1, 1],
			[1, 0],
			[3, 0],
			[0, 1]
		].sort(vectorCompare());

		expect(value).toEqual([
			[0, 1],
			[1, 0], 
			[1, 1],
			[3, 0]
		]);
	});
	it("sorts by element (uneven length)", () => {
		const value = [
			[2],
			[1, 0],
			[3, 0, 0],
			[1, 0, 1]
		].sort(vectorCompare());

		expect(value).toEqual([
			[1, 0],
			[1, 0, 1],
			[2],
			[3, 0, 0]
		]);
	});
});