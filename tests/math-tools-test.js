import { getSteps } from "../libs/math-tools.js";

describe("math-tools", () => {
	describe("getSteps", () => {
		[
			[[30, 360], [0,30,60,90,120,150,180,210,240,270,300,330,360]],
			[[30, 360, 180], [180, 210, 240, 270, 300, 330, 360]],
			[[3, 10], [0, 3, 6, 9, 10]]
		].forEach(test => it(`should get steps for ${test[0]}`, () => {
			expect(getSteps(...test[0])).toEqual(test[1]);
		}));
	});
});
