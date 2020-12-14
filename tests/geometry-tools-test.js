import { degreesToRadians, radiansToDegrees } from "../libs/geometry-tools.js";

describe("geometry-tools", () => {
	describe(".degreesToRadians", () => {
		[
			{ args: [0], result: 0 },
			{ args: [45], result: Math.PI / 4 },
			{ args: [90], result: Math.PI / 2 },
			{ args: [180], result: Math.PI },
			{ args: [270], result: 3 * Math.PI / 2 },
			{ args: [360], result: 2 * Math.PI }
		].forEach(test => {
			it(`coverts to radians ${JSON.stringify(test.args)}`, () => {
				const result = degreesToRadians(...test.args);
				expect(result).toBe(test.result);
			});
		});
	});
	describe(".radiansToDegrees", () => {
		[
			{ args: [0], result: 0 },
			{ args: [Math.PI / 4], result: 45 },
			{ args: [Math.PI / 2], result: 90 },
			{ args: [Math.PI], result: 180 },
			{ args: [3 * Math.PI / 2], result: 270 },
			{ args: [2 * Math.PI], result: 360 }
		].forEach(test => {
			it(`coverts to radians ${JSON.stringify(test.args)}`, () => {
				const result = radiansToDegrees(...test.args);
				expect(result).toBe(test.result);
			});
		});
	});
});