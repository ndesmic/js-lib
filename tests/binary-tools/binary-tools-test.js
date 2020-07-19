import { concatUint8Arrays } from "../../libs/binary-tools.js";

describe("concatUint8Arrays", () => {
	it("concats arrays", () => {
		const a = new Uint8Array(2);
		a.set([13, 99]);
		const b = new Uint8Array(3);
		b.set([100, 101, 33]);
		const c = concatUint8Arrays(a, b);
		expect(c.length).toBe(5);
		expect(c[0]).toBe(13);
		expect(c[1]).toBe(99);
		expect(c[2]).toBe(100);
		expect(c[3]).toBe(101);
		expect(c[4]).toBe(33);
	});
});