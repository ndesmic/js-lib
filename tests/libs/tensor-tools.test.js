import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect";
import { getFlatIndex, getDimensionalIndices, sum } from "../../libs/tensor-tools.js";

describe("getFlatIndex", () => {
	it("should get flat index", () => {
		const r1 = getFlatIndex([1, 1, 1], [3, 3, 3]);
		expect(r1).toEqual(13);

		const r2 = getFlatIndex([0, 0], [4, 3]);
		expect(r2).toEqual(0);

		const r3 = getFlatIndex([3, 0], [4, 3]);
		expect(r3).toEqual(3);

		const r4 = getFlatIndex([2, 3, 4], [5, 5, 5]);
		expect(r4).toEqual(117);
	});
});

describe("getShapedIndex", () => {
	it("should get shaped index", () => {
		const r1 = getDimensionalIndices(13, [3, 3, 3]);
		expect(r1).toEqual([1, 1, 1]);

		const r2 = getDimensionalIndices(0, [4, 3]);
		expect(r2).toEqual([0, 0]);

		const r3 = getDimensionalIndices(3, [4, 3]);
		expect(r3).toEqual([3, 0]);

		const r4 = getDimensionalIndices(117, [5, 5, 5]);
		expect(r4).toEqual([2, 3, 4]);
	})
});

describe("sum", () => {
	it("should get proper sum for 4x3 across rows", () => {
		const input = [
			1, 2, 3, 4,
			5, 6, 7, 8,
			9, 10, 11, 12
		];
		const shape = [4, 3]; //row,col
		const [out, outShape] = sum(input, shape, 0);
		expect(outShape).toEqual([3])
		expect(out).toEqual([10,26,42]);
	});
	it("should get proper sum for 4x3 across cols", () => {
		const input = [
			1, 2, 3, 4,
			5, 6, 7, 8,
			9, 10, 11, 12
		];
		const shape = [4, 3]; //row,col
		const [out, outShape] = sum(input, shape, 1);
		expect(outShape).toEqual([4])
		expect(out).toEqual([15, 18, 21, 24]);
	});
	it("should get proper sum for 3x3x3 across rows", () => {
		const input = [
			1, 2, 3,
			4, 5, 6,
			7, 8, 9,

			10, 11, 12,
			13, 14, 15,
			16, 17, 18,

			19, 20, 21,
			22, 23, 24,
			25, 26, 27
		];
		const shape = [3, 3, 3]; //row,col,depth
		const [out, outShape] = sum(input, shape, 0);
		expect(outShape).toEqual([3,3])
		expect(out).toEqual([
			6, 15, 24, 
			33, 42, 51,
			60, 69, 78
		]);
	});
	it("should get proper sum for 3x3x3 across cols", () => {
		const input = [
			1, 2, 3,
			4, 5, 6,
			7, 8, 9,

			10, 11, 12,
			13, 14, 15,
			16, 17, 18,

			19, 20, 21,
			22, 23, 24,
			25, 26, 27
		];
		const shape = [3, 3, 3]; //row,col,depth
		const [out, outShape] = sum(input, shape, 1);
		expect(outShape).toEqual([3, 3])
		expect(out).toEqual([
			12, 15, 18,
			39, 42, 45,
			66, 69, 72
		]);
	});
	it("should get proper sum for 3x3x3 across depths", () => {
		const input = [
			1, 2, 3,
			4, 5, 6,
			7, 8, 9,

			10, 11, 12,
			13, 14, 15,
			16, 17, 18,

			19, 20, 21,
			22, 23, 24,
			25, 26, 27
		];
		const shape = [3, 3, 3]; //row,col,depth
		const [out, outShape] = sum(input, shape, 2);
		expect(outShape).toEqual([3, 3])
		expect(out).toEqual([
			30, 33, 36,
			39, 42, 45,
			48, 51, 54
		]);
	});
});