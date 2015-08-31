QUnit.module(".isPlainObject");
QUnit.test("returns true for object", function(assert){
	assert.ok(ObjectTools.isPlainObject({}), "empty object");
	assert.ok(ObjectTools.isPlainObject({ key : "value" }), "normal object");
});
QUnit.test("returns false for value", function(assert){
	assert.ok(!ObjectTools.isPlainObject(null), "null");
	assert.ok(!ObjectTools.isPlainObject("hello"), "string");
	assert.ok(!ObjectTools.isPlainObject(0), "number");
	assert.ok(!ObjectTools.isPlainObject(true), "bool");
	assert.ok(!ObjectTools.isPlainObject(function(){}), "function");
});
QUnit.test("returns false for native objects", function(assert){
	assert.ok(!ObjectTools.isPlainObject(document.createElement("div")), "DOM node");
	assert.ok(!ObjectTools.isPlainObject(window), "window");
});
QUnit.module(".extend");
QUnit.test("extends object", function(assert){
	var result = ObjectTools.extend({ a : "a" }, { b : "b" });
	assert.deepEqual(result, { a : "a", b : "b" }, "extended object");
});
QUnit.test("overwrites object props", function(assert){
	var result = ObjectTools.extend({ a : "a" }, { a : "b" });
	assert.deepEqual(result, { a : "b" }, "overwrote prop");
});
QUnit.test("extends undefined object", function(assert){
	var result = ObjectTools.extend(undefined, { b : "b" });
	assert.deepEqual(result, { b : "b" }, "extended object");
});
QUnit.module(".isEmpty");
QUnit.test("return true if empty", function(assert){
	var result = ObjectTools.isEmpty({});
	assert.ok(result);
});
QUnit.test("return false if not empty", function(assert){
	var result = ObjectTools.isEmpty({ a : 1 });
	assert.notOk(result);
});
QUnit.test("return true if empty array", function(assert){
	var result = ObjectTools.isEmpty([]);
	assert.ok(result);
});
QUnit.test("return false if not empty array", function(assert){
	var result = ObjectTools.isEmpty([1]);
	assert.notOk(result);
});