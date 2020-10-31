import { getTimezone, isLeapYear, getDaysInMonth, getMonthMatrix } from "../libs/time-tools.js"

/*
describe(".getTimezone", () => {
	it("should get time Zone", () => { //This test is based on computer location and will fail if moved to new timezone
		expect(getTimezone()).toBe("Pacific Standard Time");
	});
});
*/

describe(".isLeapYear", () => {
	it("should get a normal year", () => {
		expect(isLeapYear(2001)).toBeFalse();
	});
	it("should get a normal year century", () => {
		expect(isLeapYear(1700)).toBeFalse();
	});
	it("should get a leap year", () => {
		expect(isLeapYear(2020)).toBeTrue();
	});
	it("should get a leap century", () => {
		expect(isLeapYear(1600)).toBeTrue();
	});
});

describe(".getDaysInMonth", () => {
	it("should get days in month", () => {
		expect(getDaysInMonth(1, 2021)).toBe(31);
		expect(getDaysInMonth(2, 2021)).toBe(28);
		expect(getDaysInMonth(3, 2021)).toBe(31);
		expect(getDaysInMonth(4, 2021)).toBe(30);
		expect(getDaysInMonth(5, 2021)).toBe(31);
		expect(getDaysInMonth(6, 2021)).toBe(30);
		expect(getDaysInMonth(7, 2021)).toBe(31);
		expect(getDaysInMonth(8, 2021)).toBe(31);
		expect(getDaysInMonth(9, 2021)).toBe(30);
		expect(getDaysInMonth(10, 2021)).toBe(31);
		expect(getDaysInMonth(11, 2021)).toBe(30);
		expect(getDaysInMonth(12, 2021)).toBe(31);
	});
	it("should get leap year February", () => {
		expect(getDaysInMonth(2, 2000)).toBe(29);
	});
});

describe(".getMonthMatrix", () => {
	it("should get month matrix for 2/2020 (leap year)", () => {
		const result = getMonthMatrix(2, 2020);
		expect(result).toEqual([
			[null, null, null, null, null, null, 1],
			[2, 3, 4, 5, 6, 7, 8],
			[9, 10, 11, 12, 13, 14, 15],
			[16, 17, 18, 19, 20, 21, 22],
			[23, 24, 25, 26, 27, 28, 29]
		]);
	});
	it("should get month matrix for 3/2020", () => {
		const result = getMonthMatrix(3, 2020);
		expect(result).toEqual([
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
			[29, 30, 31, null, null, null, null]
		]);
	});
	it("should get month matrix for 2/2015 (perfect February)", () => {
		const result = getMonthMatrix(2, 2015);
		expect(result).toEqual([
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28]
		]);
	});
});

