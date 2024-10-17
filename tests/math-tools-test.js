import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { getSteps, getClosest, lerp, inverseLerp, leftShiftBase10, rightShiftBase10, floorAtPosition, getLinearSpace } from "../libs/math-tools.js";
import { multiTest } from "./test-tools.js";

describe("math-tools", () => {
	multiTest([
		{ args: [360, { step: 30 }], expected: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360] },
		{ args: [360, { step: 30, start: 180 }], expected: [180, 210, 240, 270, 300, 330, 360] },
		{ args: [10, { step: 3 }], expected: [0, 3, 6, 9, 10] },
		{ args: [10, { step: 3, includeEnd: false }], expected: [0, 3, 6, 9] },
	], (test) => {
		expect(getSteps(...test.args)).toEqual(test.expected)
	});

	multiTest([
		{ args: [0, 100, 5], expected: [0, 25, 50, 75, 100] },
		{ args: [3, 9, 4], expected: [3, 5, 7, 9] },
		{ args: [0, 10, 2], expected: [0, 10] },
	], (test) => {
		expect(getLinearSpace(...test.args)).toEqual(test.expected)
	});

	describe("getCloset", () => {
		[
			[[3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], 3],
			[[7, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], 7],
			[[0, [0, 1, 2, 3, 4, 5, 6, 7, 8 ,9]], 0],
			[[9, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], 9],
			[[-1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], 0],
			[[14, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], 9],
			[[3, [0, 1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 9]], 3],
		].forEach(test => it(`should get closet to ${test[0][0]} from set ${test[0][1]}`, () => {
			expect(getClosest(...test[0])).toEqual(test[1]);
		}));
	});
	describe("lerp", () => {
		[
			[[0, 1, 0.5], 0.5],
			[[0, 2, 0.5], 1],
			[[-1, 1, 0.5], 0],
			[[0, 10, 0.75], 7.5]
		].forEach(test => it(`should get value ${test[1]} for start ${test[0][0]} and end ${test[0][1]} at value ${test[0][2]}`, () => {
			expect(lerp(test[0][0], test[0][1], test[0][2])).toEqual(test[1]);
		}))
	});
	describe("inverseLerp", () => {
		[
			[[0, 1, 0.5], 0.5],
			[[0, 2, 1], 0.5],
			[[-1, 1, 0], 0.5],
			[[0, 10, 7.5], 0.75]
		].forEach(test => it(`should get value ${test[1]} for start ${test[0][0]} and end ${test[0][1]} at value ${test[0][2]}`, () => {
			expect(inverseLerp(test[0][0], test[0][1], test[0][2])).toEqual(test[1]);
		}))
	});
	describe("leftShiftBase10", () => {
		[
			[[123, 0], 123],
			[[123, 1], 1230],
			[[123, 2], 12300],
			[[123, 3], 123000],
			[[123, 4], 1230000]
		].forEach(test => it(`should get ${test[1]} for args ${[test[0]]}`, () => {
			expect(leftShiftBase10(test[0][0], test[0][1])).toEqual(test[1]);
		}))
	});
	describe("rightShiftBase10", () => {
		[
			[[123, 0], 123],
			[[123, 1], 12.3],
			[[123, 2], 1.23],
			[[123, 3], 0.123],
			[[123, 4], 0.0123]
		].forEach(test => it(`should get ${test[1]} for args ${[test[0]]}`, () => {
			expect(rightShiftBase10(test[0][0], test[0][1])).toEqual(test[1]);
		}))
	});
	describe("floorAtPosition", () => {
		[
			[[123.123, 0], 123],
			[[123.123, 1], 120],
			[[123.123, 2], 100],
			[[123.123, 3], 0],
			[[123.123, -1], 123.1],
			[[123.123, -2], 123.12],
			[[123.123, -3], 123.123],
		].forEach(test => it(`should get ${test[1]} for args ${[test[0]]}`, () => {
			expect(floorAtPosition(test[0][0], test[0][1])).toBeCloseTo(test[1], 5);
		}))
	});
});
