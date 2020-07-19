import { toBinary } from "../libs/number-tools.js";

export class BitStream {
	constructor() {
		this.bitIndex = 0;
		this.byteIndex = 0;
		this.buffer = new Uint8Array(1);
	}
	resize() {
		this.bitIndex = 0;
		this.byteIndex++;
		const oldBuffer = this.buffer;
		this.buffer = new Uint8Array(this.buffer.length + 1);
		this.buffer.set(oldBuffer, 0);
	}
	push(number) {
		const binary = toBinary(number);
		for (let bit of binary) {
			if (this.bitIndex > 7) this.resize();
			this.buffer[this.byteIndex] = this.buffer[this.byteIndex] | (bit << (7 - this.bitIndex));
			this.bitIndex++;
		}
	}
}