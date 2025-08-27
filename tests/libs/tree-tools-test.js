import { filterTree, mapTree } from "../../libs/tree-tools.js";

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

	it("maps a tree and keys", async () => {
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

		const result = mapTree(t, v => String.fromCharCode(v + 64), x => "$" + x);

		expect(result.$foo.$bar).toBe("A");
		expect(result.$baz).toBe("B");
		expect(result.$qux.$ist.$ber).toBe("C");
		expect(result.$qux.$eld).toBe("D");
		expect(result.$eth.$el).toBe("E");
		expect(result.$zod).toBe("F");
	});

	it("maps a tree with keys and paths", async () => {
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

		const result = mapTree(t, (v, k, p) => p.join(".") + "." + k);

		expect(result.foo.bar).toBe("foo.bar");
		expect(result.baz).toBe(".baz");
		expect(result.qux.ist.ber).toBe("qux.ist.ber");
		expect(result.qux.eld).toBe("qux.eld");
		expect(result.eth.el).toBe("eth.el");
		expect(result.zod).toBe(".zod");
	});
});

describe("filterTree", () => { 
	it("filters a tree (shallow)", () => {
		const t = {
			foo: 1,
			bar: 2
		};

		const result = filterTree(t, x => x === 1);

		expect(result).toEqual({
			foo: 1
		});
	});
	it("filters a tree (deep)", () => {
		const t = {
			foo: 1,
			bar: 2,
			baz: {
				el: 3,
				eld: 4
			}
		};

		const result = filterTree(t, x => x !== 3);

		expect(result).toEqual({
			foo: 1,
			bar: 2,
			baz: {
				eld: 4
			}
		});
	});
	it("filters a tree (removed node)", () => {
		const t = {
			foo: 1,
			bar: 2,
			baz: {
				el: 3,
				eld: 4
			}
		};

		const result = filterTree(t, x => x < 3);

		expect(result).toEqual({
			foo: 1,
			bar: 2
		});
	});
});
