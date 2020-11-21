import { mapTree } from "../libs/tree-tools.js";

describe("mapTree", () => {
	it("maps a tree", async () => {
		const t = {
			foo: {
				bar: 1
			},
			baz: 2,
			qux: {
				ist: {
					ber: 3
				},
				eld: 4
			},
			eth: {
				el: 5
			},
			zod: 6
		};

		const result = mapTree(t, v => String.fromCharCode(v + 64));

		expect(result.foo.bar).toBe("A");
		expect(result.baz).toBe("B");
		expect(result.qux.ist.ber).toBe("C");
		expect(result.qux.eld).toBe("D");
		expect(result.eth.el).toBe("E");
		expect(result.zod).toBe("F");
	});
});
