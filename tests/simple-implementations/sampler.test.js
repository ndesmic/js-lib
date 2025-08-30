import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect";
import {
	sampleArray
} from "../../simple-implementations/sampler.js"
import { multiTest } from "../test-tools.js";

describe("sampleArray", () => {
	multiTest([
		// { args: [[2, 3], 0, "clamp"], expected: 2 },
		// { args: [[2, 3], 1, "clamp"], expected: 3 },
		// { args: [[2, 3], -1, "clamp"], expected: 2 },
		// { args: [[2, 3], 2, "clamp"], expected: 3 },
		// { args: [[2, 3], -1, "wrap"], expected: 3 },
		// { args: [[2, 3], 2, "wrap"], expected: 2 },
		// { args: [[2, 3], -1, "mirror"], expected: 2 },
		// { args: [[2, 3], 2, "mirror"], expected: 2 },
		// { args: [[2, 3], -1, 4], expected: 4 },
		// { args: [[2, 3], 2, 4], expected: 4 },
		{ args: [[2, 3], 0.5, 4], expected: 2.5 },
	], (test) => {
		expect(sampleArray(...test.args)).toEqual(test.expected)
	});
});