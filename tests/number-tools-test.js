import { toBinary } from "../libs/number-tools.js"; 

describe("toBinary", () => {
	[
		[0, [0]],
		[1, [1]],
		[2, [1, 0]],
		[3, [1, 1]],
		[4, [1, 0, 0]],
		[5, [1, 0, 1]],
		[6, [1, 1, 0]],
		[7, [1, 1, 1]],
		[8, [1, 0, 0, 0]],
		[9, [1, 0, 0, 1]],
		[10, [1, 0, 1, 0]],
		[530, [1, 0, 0, 0, 0, 1, 0, 0, 1, 0]]
	]
		.forEach(test => it(`should convert ${test[0]} to binary`, () => {
			expect(toBinary(test[0])).toEqual(test[1]);
		}));
});