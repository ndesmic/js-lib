import { readOob } from "../../libs/image-tools.js";

describe("readOob", () => {
	it("reads in bounds", () => {
		const value = readOob(20, 0, 100, "clamp");
		expect(value).toEqual(20);
	});
	it("reads out of bounds high (clamp)", () => {
		const value = readOob(120, 0, 100, "clamp");
		expect(value).toEqual(100);
	});
	it("reads out of bounds low (clamp)", () => {
		const value = readOob(-20, 0, 100, "clamp");
		expect(value).toEqual(0);
	});
	it("reads out of bounds high (wrap)", () => {
		const value = readOob(130, 0, 100, "wrap");
		expect(value).toEqual(30);
	});
	it("reads out of bounds low (clamp)", () => {
		const value = readOob(-30, 0, 100, "wrap");
		expect(value).toEqual(70);
	});
});