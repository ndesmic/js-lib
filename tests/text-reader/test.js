QUnit.module(".readChar");
QUnit.test("returns char and advances index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.readChar();
	assert.equal(result, "h", "value");
	assert.equal(reader.index, 1, "index");
});

QUnit.module(".peekChar");
QUnit.test("returns char and does not advance index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.peekChar();
	assert.equal(result, "h", "value");
	assert.equal(reader.index, 0, "index");
});

QUnit.module(".validate");
QUnit.test("returns true if validated and advances index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.validate("hel");
	assert.ok(result, "value");
	assert.equal(reader.index, 3, "index");
});
QUnit.test("returns true if validated and advances index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.validate("wor");
	assert.notOk(result, "value");
	assert.equal(reader.index, 0, "index");
});

QUnit.module(".peekValidate");
QUnit.test("returns false if not validated and does not advance index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.peekValidate("hel");
	assert.ok(result, "value");
	assert.equal(reader.index, 0, "index");
});
QUnit.test("returns false if not validated and does not advance index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.peekValidate("wor");
	assert.notOk(result, "value");
	assert.equal(reader.index, 0, "index");
});

QUnit.module(".readUntil");
QUnit.test("returns string until character and advances index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.readUntil("w");
	assert.equal(result, "hello ", "value");
	assert.equal(reader.index, 6, "index");
});

QUnit.module(".peekUntil");
QUnit.test("returns until match and does not advance index (char)", function(assert){
	const reader = TextReader.create("hello world");
	let { result, match } = reader.peekUntil("w");
	assert.equal(result, "hello ", "value");
	assert.equal(reader.index, 0, "index");
});
QUnit.test("returns until match and does not advance index (string)", function(assert){
	const reader = TextReader.create("hello world");
	let { result, match } = reader.peekUntil("rl");
	assert.equal(result, "hello wo", "value");
	assert.equal(reader.index, 0, "index");
});
QUnit.test("returns until first match and does not advance index (char)", function(assert){
	const reader = TextReader.create("hello world");
	let { result, match } = reader.peekUntil("l", "r");
	assert.equal(match, "l", "match");
	assert.equal(result, "he", "value");
	assert.equal(reader.index, 0, "index");
});
QUnit.test("returns until first match and does not advance index (param order)", function(assert){
	const reader = TextReader.create("hello world");
	let { result, match } = reader.peekUntil("d", "r");
	assert.equal(match, "r", "match");
	assert.equal(result, "hello wo", "value");
	assert.equal(reader.index, 0, "index");
});
QUnit.test("returns until first match and does not advance index (string)", function(assert){
	const reader = TextReader.create("hello world");
	let { result, match } = reader.peekUntil("lo", "rl");
	assert.equal(match, "lo", "match");
	assert.equal(result, "hel", "value");
	assert.equal(reader.index, 0, "index");
});
QUnit.test("returns null and rest of text if not found", function(assert){
	const reader = TextReader.create("hello world");
	let { result, match } = reader.peekUntil("z", ".");
	assert.equal(match, null, "match");
	assert.equal(result, "hello world", "value");
	assert.equal(reader.index, 0, "index");
});


QUnit.module(".readToEnd");
QUnit.test("returns string until character and advances index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.readToEnd();
	assert.equal(result, "hello world", "value");
	assert.equal(reader.index, 11, "index");
});

QUnit.module(".peekToEnd");
QUnit.test("returns string until character and advances index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.peekToEnd();
	assert.equal(result, "hello world", "value");
	assert.equal(reader.index, 0, "index");
});

QUnit.module(".readWhiteSpace");
QUnit.test("returns string until non-whitespace and advances index", function(assert){
	const reader = TextReader.create("   h");
	let result = reader.readWhiteSpace();
	assert.equal(result, "   ", "value");
	assert.equal(reader.index, 3, "index");
});
var tests = [
	String.fromCharCode(9),
	String.fromCharCode(10),
	String.fromCharCode(13),
	String.fromCharCode(32)
]
tests.forEach(test => {
	QUnit.test("returns should read as whiteSpace", function(assert){
		const reader = TextReader.create(test);
		let result = reader.readWhiteSpace();
		assert.equal(result, test, "value");
		assert.equal(reader.index, 1, "index");
	});
});
