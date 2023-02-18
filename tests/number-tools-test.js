import { toBinary, wrap, clamp, mirrorWrap } from "../libs/number-tools.js"; 

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

describe("clamp", () => {
	it("should get in range", () => {
		expect(clamp(70, 0, 100)).toEqual(70);
	});
	it("should clamp high", () => {
		expect(clamp(170, 0, 100)).toEqual(100);
	});
	it("should clamp high with non-zero min", () => {
		expect(clamp(170, 10, 100)).toEqual(100);
	});
	it("should wrap low", () => {
		expect(clamp(-7, 0, 100)).toEqual(0);
	});
	it("should wrap low with non-zero min", () => {
		expect(clamp(3, 10, 100)).toEqual(10);
	});
});
describe("wrap", () => {
	it("should get in range", () => {
		expect(wrap(70, 0, 100)).toEqual(70);
	});
	it("should wrap high", () => {
		expect(wrap(170, 0, 100)).toEqual(70);
	});
	it("should wrap high with non-zero min", () => {
		expect(wrap(170, 10, 100)).toEqual(90);
	});
	it("should wrap low", () => {
		expect(wrap(-7, 0, 100)).toEqual(93);
	});
	it("should wrap low with non-zero min", () => {
		expect(wrap(3, 10, 100)).toEqual(93);
	});
});
describe("mirrorWrap", () => {
	it("should get in range", () => {
		expect(mirrorWrap(70, 0, 100)).toEqual(70);
	});
	it("should mirror high (mirrored)", () => {
		expect(mirrorWrap(170, 0, 100)).toEqual(30);
	});
	it("should mirror high (unmirrored)", () => {
		expect(mirrorWrap(210, 0, 100)).toEqual(10);
	});
	it("should mirror high with non-zero min (mirrored)", () => {
		expect(mirrorWrap(170, 10, 100)).toEqual(30);
	});
	it("should mirror high with non-zero min (unmirrored)", () => {
		expect(mirrorWrap(220, 10, 100)).toEqual(40);
	});
	it("should mirror low (mirrored)", () => {
		expect(mirrorWrap(-7, 0, 100)).toEqual(7);
	});
	it("should mirror low (unmirrored)", () => {
		expect(mirrorWrap(-107, 0, 100)).toEqual(93);
	});
	it("should mirror low with non-zero min (mirrored)", () => {
		expect(mirrorWrap(3, 10, 100)).toEqual(17);
	});
	it("should mirror low with non-zero min (unmirrored)", () => {
		expect(mirrorWrap(-99, 10, 100)).toEqual(81);
	});
});