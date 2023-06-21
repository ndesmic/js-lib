import { coalesce } from "../libs/value-tools.js";

describe(".coalesce", () => {
	[
		{ args: [1, 2, 3], result: 1 },
		{ args: [null, 1, 2], result: 1 },
		{ args: [undefined, 1, 2], result: 1 },
		{ args: [null, 0, undefined], result: 0 },
		{ args: [undefined, null, 1], result: 1 },
		{ args: ["", null, 1], result: "" },
		{ args: [null, "", 1], result: "" },
		{ args: [null, null, null], result: undefined },
	].forEach((test) => {
		it("coaleses to", () => {
			const result = coalesce(...test.args);
			expect(result).toBe(test.result);
		});
	});
});