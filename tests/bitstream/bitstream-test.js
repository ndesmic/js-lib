import { BitStream } from "../../simple-implementations/bitstream.js";

describe("BitSteam", () => {
	it("can push some bits", () => {
		const bitSteam = new BitStream();
		bitSteam.push(9);
		expect(bitSteam.buffer[0]).toBe(144);
	});
	it("can push some bits and resize", () => {
		//This API probably doesn't make sense...
		const bitSteam = new BitStream();
		bitSteam.push(9);
		bitSteam.push(3);
		bitSteam.push(11);
		expect(bitSteam.buffer[0]).toBe(158);
	});
});