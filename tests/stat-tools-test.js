import { sum, average, standardDeviation } from "../libs/stat-tools.js";

describe("sum", () => {
	it("gets the sum", () => {
		expect(sum([1,2,3,4,5,6,7,8,9,10])).toBe(55);
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