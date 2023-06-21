import { getCaptureMatches } from "../libs/regex-tools.js";

describe(".getCaptureMatches", () => {
	[
		{ args: ["t(e)(s)t", /\((.)\)/], result: undefined },
		{ args: ["t(e)(s)t", /\((.)\)/g], result: ["e", "s"] },
		{ args: ["test test test", /\((.)\)/g], result: [] },
		{ args: ["t(e)(s)(somestuff)t", /\((.*?)\)/g], result: ["e", "s", "somestuff"] },
	].forEach((test) => {
		it("should get capture groups", () => {
			const result = getCaptureMatches(...test.args);
			expect(result).toEqual(test.result);
		});
	});
});