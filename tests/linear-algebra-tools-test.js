import { dot } from "../../base-libs/linear-algebra-tools.js";

describe(".linear algebra tools", () => {
	it("properly dots matricies (2x3, 3x2)", () => {
		const x = [[1, 2, 3],
		[4, 5, 6]];
		const y = [[7, 8],
		[9, 10],
		[11, 12]];
		const result = dot(x, y);

		expect(result).toEqual([[58, 64],[139, 154]]);
	});

	it("properly dots matricies (1x3, 3x1)", () => {
		const x = [[4, 6, 8]];
		const y = [[10], [11], [12]];
		const result = dot(x, y);

		expect(result).toEqual([[202]]);
	});

	it("throws when sides are mismached (1x2, 1x2)", () => {
		const x = [[10, 11]];
		const y = [[13, 14]];

		expect(() => dot(x, y)).toThrow();
	});
});
