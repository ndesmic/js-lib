import {
	isPlainObject,
	accessProperty,
	isEmpty,
	deepClone,
	diffObject
} from "../libs/object-tools.js";

describe("isPlainObject", () => {
	it("returns true for object", () => {
		expect(isPlainObject({})).toBeTruthy();
		expect(isPlainObject({ key: "value" })).toBeTruthy();
	});
	it("returns false for value", () => {
		expect(isPlainObject(null)).toBeFalsy();
		expect(isPlainObject("hello")).toBeFalsy();
		expect(isPlainObject(0)).toBeFalsy();
		expect(isPlainObject(true)).toBeFalsy();
		expect(isPlainObject(function () { })).toBeFalsy();
	});
	it("returns false for native objects", () => {
		expect(isPlainObject(document.createElement("div"))).toBeFalsy();
		expect(isPlainObject(window)).toBeFalsy();
	});
});

describe("accessProperty", () => {
	it("accesses property", () => {
		const result = accessProperty({ a: "a" }, "a");
		expect(result).toBe("a");
	});
	it("accesses deep property", () => {
		const result = accessProperty({ a: { b: "b" } }, "a.b");
		expect(result).toBe("b");
	});
	it("returns null if no property", () => {
		const result = accessProperty({ a: { b: "b" } }, "c");
		expect(result).toBeNull();
	});
	it("returns null if no nested property", () => {
		const result = accessProperty({ a: { b: "b" } }, "a.c");
		expect(result).toBeNull();
	});
	it("returns null if no object", () => {
		const result = accessProperty(null, "a");
		expect(result).toBeNull();
	});
	it("returns null if no accessor", () => {
		const result = accessProperty({ a: "a" });
		expect(result).toBeNull();
	});
	it("returns null if accessing property of null", () => {
		const result = accessProperty({ a: { b: null } }, "a.b.c");
		expect(result).toBeNull();
	})
});

describe("isEmpty", () => {
	it("return true if empty", () => {
		const result = isEmpty({});
		expect(result).toBeTruthy();
	});
	it("return false if not empty", () => {
		const result = isEmpty({ a: 1 });
		expect(result).toBeFalsy();
	});
	it("return true if empty array", () => {
		const result = isEmpty([]);
		expect(result).toBeTruthy();
	});
	it("return false if not empty array", () => {
		const result = isEmpty([1]);
		expect(result).toBeFalsy();
	});
});


describe("deepClone", () => {
	it("returns clone of value", () => {
		expect(deepClone(null)).toBe(null);
		expect(deepClone("hello")).toBe("hello");
		expect(deepClone(0)).toBe(0);
		expect(deepClone(true)).toBe(true);
	});
	it("returns clone of array", () => {
		const original = [1, 2, 3];
		const clone = deepClone(original);
		expect(clone).toEqual([1, 2, 3]);
		expect(clone).not.toBe(original);
	});
	it("returns clone of array with nesting", () => {
		const a = { a: 1 };
		const b = { b: 2 };
		const c = { c: 3 };
		const original = [a, b, c];
		const clone = deepClone(original);
		expect(clone).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
		expect(clone).not.toBe(original);
		expect(clone[0]).not.toBe(a);
		expect(clone[1]).not.toBe(b);
		expect(clone[3]).not.toBe(c);
	});
	it("returns clone of object", () => {
		const original = { a: 1, b: 2, c: 3 };
		const clone = deepClone(original);
		expect(clone).toEqual({ a: 1, b: 2, c: 3 });
		expect(clone).not.toBe(original);
	});
	it("returns clone of object with nesting", () => {
		const a = { a: 1 };
		const b = { b: 2 };
		const c = { c: 3 };
		const original = { a: a, b: b, c: c };
		const clone = deepClone(original);
		expect(clone).toEqual({ a: { a: 1 }, b: { b: 2 }, c: { c: 3 } });
		expect(clone).not.toBe(original);
		expect(clone.a).not.toBe(a);
		expect(clone.b).not.toBe(b);
		expect(clone.c).not.toBe(c);
	});
});

describe("diffObject", () => {
	[
		{
			args: [true, true],
			expected: {
				added: [],
				missing: [],
				different: []
			}
		},
		{
			args: [1, 1],
			expected: {
				added: [],
				missing: [],
				different: []
			}
		},
		{
			args: [true, 1],
			expected: {
				added: [],
				missing: [],
				different: [{ path: "", baseValue: true, testValue: 1 }]
			}
		},
		{
			args: [1, true],
			expected: {
				added: [],
				missing: [],
				different: [{ path: "", baseValue: 1, testValue: true }]
			}
		},
		{
			args: [true, {}],
			expected: {
				added: [],
				missing: [],
				different: [{ path: "", baseValue: true, testValue: {} }]
			}
		},
		{
			args: [{}, true],
			expected: {
				added: [],
				missing: [],
				different: [{ path: "", baseValue: {}, testValue: true }]
			}
		},
		{
			args: [{ foo: "foo" }, { foo: "foo" }],
			expected: {
				added: [],
				missing: [],
				different: []
			}
		},
		{
			args: [{ foo: "foo" }, { foo: "bar" }],
			expected: {
				added: [],
				missing: [],
				different: [{ path: ".foo", baseValue: "foo", testValue: "bar" }]
			}
		},
		{
			args: [{ foo: { bar: 1 } }, { foo: { bar: 1 } }],
			expected: {
				added: [],
				missing: [],
				different: []
			}
		},
		{
			args: [{ foo: { bar: 1 } }, { foos: { bar: 1 } }],
			expected: {
				added: [".foos"],
				missing: [ ".foo" ],
				different: []
			}
		},
		{
			args: [{ foo: 1 }, { }],
			expected: {
				added: [],
				missing: [".foo"],
				different: []
			}
		},
		{
			args: [{}, { foo: 1 }],
			expected: {
				added: [".foo"],
				missing: [],
				different: []
			}
		},
		{
			args: [{ foo: "foo", bar: "bar" }, { qux: 1 }],
			expected: {
				added: [".qux"],
				missing: [".foo", ".bar"],
				different: []
			}
		},
		{
			args: [{ foo: { bar: 1 } }, { foo: { bar: 2 } }],
			expected: {
				added: [],
				missing: [],
				different: [{ path: ".foo.bar", baseValue: 1, testValue: 2 }]
			}
		},
		{
			args: [{ foo: { bar: 2 } }, { foo: { bar: 1 } }],
			expected: {
				added: [],
				missing: [],
				different: [{ path: ".foo.bar", baseValue: 2, testValue: 1 }]
			}
		},
		{
			args: [[1,2,3], [1,2,3]],
			expected: {
				added: [],
				missing: [],
				different: []
			}
		},
		{
			args: [[1, 2, 3], [1, 1, 3]],
			expected: {
				added: [],
				missing: [],
				different: [{ path: ".1", baseValue: 2, testValue: 1 }]
			}
		},
		{
			args: [{foo: [1, 2, 3]}, {foo: [1, 1, 3]}],
			expected: {
				added: [],
				missing: [],
				different: [{ path: ".foo.1", baseValue: 2, testValue: 1 }]
			}
		},
		{
			args: [[1, 2, [3,4]], [1, 2, [3,4]]],
			expected: {
				added: [],
				missing: [],
				different: []
			}
		},
		{
			args: [[1, 2, [3, 4]], [1, 2, [5, 4]]],
			expected: {
				added: [],
				missing: [],
				different: [{ path: ".2.0", baseValue: 3, testValue: 5 }]
			}
		}
	].forEach(test => {
		it(`should get ${JSON.stringify(test.expected)} for ${JSON.stringify(test.args)}`, () => {
			const result = diffObject(...test.args);
			expect(result).toEqual(test.expected);
		});
	})
});