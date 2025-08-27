import { TextReader } from "../../simple-implementations/text-reader.js"

describe(".readChar", () => {
	it("returns char and advances index", () => {
		const reader = new TextReader("hello world");
		let result = reader.readChar();
		expect(result).toEqual("h");
		expect(reader.index).toEqual(1);
	});
});

describe(".peekChar", () => {
	it("returns char and does not advance index", () => {
		const reader = new TextReader("hello world");
		let result = reader.peekChar();
		expect(result).toEqual("h");
		expect(reader.index).toEqual(0);
	});
});

describe(".validate", () => {
	it("returns true if validated and advances index", () => {
		const reader = new TextReader("hello world");
		let result = reader.validate("hel");
		expect(result).toBeTruthy();
		expect(reader.index).toEqual(3);
	});
	it("returns true if validated and advances index", () => {
		const reader = new TextReader("hello world");
		let result = reader.validate("wor");
		expect(result).not.toBeTruthy();
		expect(reader.index).toEqual(0);
	});
});



describe(".peekValidate", () => {
	it("returns false if not validated and does not advance index", function () {
		const reader = new TextReader("hello world");
		let result = reader.peekValidate("hel");
		expect(result).toBeTruthy();
		expect(reader.index).toEqual(0);
	});
	it("returns false if not validated and does not advance index", function () {
		const reader = new TextReader("hello world");
		let result = reader.peekValidate("wor");
		expect(result).not.toBeTruthy();
		expect(reader.index).toEqual(0);
	});
});

describe(".readUntil", () => {
	it("returns until match and advances index (char)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.readUntil("w");
		expect(result).toEqual("hello ");
		expect(reader.index).toEqual(6);
	});
	it("returns until match and advances index (string)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.readUntil("rl");
		expect(result).toEqual("hello wo");
		expect(reader.index).toEqual(8);
	});
	it("returns until first match and advances index (char)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.readUntil("l", "r");
		expect(match).toEqual("l");
		expect(result).toEqual("he");
		expect(reader.index).toEqual(2);
	});
	it("returns until first match and advances index (param order)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.readUntil("d", "r");
		expect(match).toEqual("r");
		expect(result).toEqual("hello wo");
		expect(reader.index).toEqual(8);
	});
	it("returns until first match and advances index (string)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.readUntil("lo", "rl");
		expect(match).toEqual("lo");
		expect(result).toEqual("hel");
		expect(reader.index).toEqual(3);
	});
	it("returns null and rest of text if not found", function () {
		const reader = new TextReader("hello world");
		let { result } = reader.readUntil("z", ".");
		expect(result).toEqual("hello world");
		expect(reader.index).toEqual(11);
	});
});

describe(".peekUntil", () => {
	it("returns until match and does not advance index (char)", function () {
		const reader = new TextReader("hello world");
		let { result } = reader.peekUntil("w");
		expect(result).toEqual("hello ");
		expect(reader.index).toEqual(0);
	});
	it("returns until match and does not advance index (string)", function () {
		const reader = new TextReader("hello world");
		let { result } = reader.peekUntil("rl");
		expect(result).toEqual("hello wo");
		expect(reader.index).toEqual(0);
	});
	it("returns until first match and does not advance index (char)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.peekUntil("l", "r");
		expect(match).toEqual("l");
		expect(result).toEqual("he");
		expect(reader.index).toEqual(0);
	});
	it("returns until first match and does not advance index (param order)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.peekUntil("d", "r");
		expect(match).toEqual("r");
		expect(result).toEqual("hello wo");
		expect(reader.index).toEqual(0);
	});
	it("returns until first match and does not advance index (string)", function () {
		const reader = new TextReader("hello world");
		let { result, match } = reader.peekUntil("lo", "rl");
		expect(match).toEqual("lo");
		expect(result).toEqual("hel");
		expect(reader.index).toEqual(0);
	});
	it("returns null and rest of text if not found", function () {
		const reader = new TextReader("hello world");
		let { result } = reader.peekUntil("z", ".");
		expect(result).toEqual("hello world");
		expect(reader.index).toEqual(0);
	});
});


describe(".readToEnd", () => {
	it("returns string until character and advances index", function () {
		const reader = new TextReader("hello world");
		let result = reader.readToEnd();
		expect(result).toEqual("hello world");
		expect(reader.index).toEqual(11);
	});
});

describe(".peekToEnd", () => {
	it("returns string until character and advances index", function () {
		const reader = new TextReader("hello world");
		let result = reader.peekToEnd();
		expect(result).toEqual("hello world");
		expect(reader.index).toEqual(0);
	});
});

describe(".readWhiteSpace", () => {
	it("returns string until non-whitespace and advances index", () => {
		const reader = new TextReader("   h");
		let result = reader.readWhiteSpace();
		expect(result).toEqual("   ");
		expect(reader.index).toEqual(3);
	});
	[
		String.fromCharCode(9),
		String.fromCharCode(10),
		String.fromCharCode(13),
		String.fromCharCode(32)
	].forEach(test => {
		it("returns should read as whiteSpace", () => {
			const reader = new TextReader(test);
			let result = reader.readWhiteSpace();
			expect(result).toEqual(test);
			expect(reader.index).toEqual(1);
		});
	});
});
