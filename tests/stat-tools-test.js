import { sum, min, max, average, standardDeviation } from "../libs/stat-tools.js";

describe("sum", () => {
	it("gets the sum", () => {
		expect(sum([1,2,3,4,5,6,7,8,9,10])).toBe(55);
	});
});

describe("min", () => {
	it("gets the min", () => {
		expect(min([4, 2, 1, 7, 10, 6, 3, 8, 9, 5])).toBe(1);
	});
});

describe("max", () => {
	it("gets the max", () => {
		expect(max([4, 2, 1, 7, 10, 6, 3, 8, 9, 5])).toBe(10);
	});
});

describe("sum", () => {
	it("gets the sum", () => {
		expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(55);
	});
});

describe("average", () => {
	it("gets the average", () => {
		expect(average([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5);
	});
});

describe("standardDeviation", () => {
	it("gets the standard deviation", () => {
		expect(standardDeviation([2,4,4,4,5,5,7,9])).toBe(4);
	});
});