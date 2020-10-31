import { concatUint8Arrays, byteToDec } from "../libs/binary-tools.js";

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

describe("byteToDec", () => {
	[
		[[0, 0, 0, 0, 0, 0, 0, 0], 0],
		[[0, 0, 0, 0, 0, 0, 0, 1], 1],
		[[0, 0, 0, 0, 0, 0, 1, 0], 2],
		[[0, 0, 0, 0, 0, 1, 0, 0], 4],
		[[0, 0, 0, 0, 1, 0, 0, 0], 8],
		[[0, 0, 0, 1, 0, 0, 0, 0], 16],
		[[0, 0, 1, 0, 0, 0, 0, 0], 32],
		[[0, 1, 0, 1, 1, 0, 1, 1], 91]
	].forEach(test => 
		it(`Converts ${test[0]} array to ${test[1]}`, () =>{
			expect(byteToDec(test[0])).toBe(test[1]);
		}));
});