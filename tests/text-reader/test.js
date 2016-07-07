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
QUnit.test("returns string until character and does not advance index", function(assert){
	const reader = TextReader.create("hello world");
	let result = reader.peekUntil("w");
	assert.equal(result, "hello ", "value");
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
