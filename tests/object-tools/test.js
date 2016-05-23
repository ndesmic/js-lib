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

QUnit.module(".extendIgnoreEmpties");
QUnit.test("extends object", function(assert){
	var result = ObjectTools.extendIgnoreEmpties({ a : "a" }, { b : "b" });
	assert.deepEqual(result, { a : "a", b : "b" }, "extended object");
});
QUnit.test("overwrites object props", function(assert){
	var result = ObjectTools.extendIgnoreEmpties({ a : "a" }, { a : "b" });
	assert.deepEqual(result, { a : "b" }, "overwrote prop");
});
QUnit.test("doesn't overwrite props with undefined", function(assert){
	var result = ObjectTools.extendIgnoreEmpties({ a : "a" }, { a : undefined });
	assert.deepEqual(result, { a : "a" }, "didn't overwrite prop");
});
QUnit.test("doesn't overwrite props with null", function(assert){
	var result = ObjectTools.extendIgnoreEmpties({ a : "a" }, { a : null });
	assert.deepEqual(result, { a : "a" }, "didn't overwrite prop");
});
QUnit.test("doesn't overwrite props with empty string", function(assert){
	var result = ObjectTools.extendIgnoreEmpties({ a : "a" }, { a : "" });
	assert.deepEqual(result, { a : "a" }, "didn't overwrite prop");
});
QUnit.test("extends undefined object", function(assert){
	var result = ObjectTools.extendIgnoreEmpties(undefined, { b : "b" });
	assert.deepEqual(result, { b : "b" }, "extended object");
});

QUnit.module(".access");
QUnit.test("accesses property", function(assert){
	var result = ObjectTools.access({ a : "a" }, "a");
	assert.deepEqual(result, "a", "got property");
});
QUnit.test("accesses deep property", function(assert){
	var result = ObjectTools.access({ a : { b : "b" } }, "a.b");
	assert.deepEqual(result, "b", "got property");
});
QUnit.test("returns null if no property", function(assert){
	var result = ObjectTools.access({ a : { b : "b" } }, "c");
	assert.deepEqual(result, null, "got null");
});
QUnit.test("returns null if no nested property", function(assert){
	var result = ObjectTools.access({ a : { b : "b" } }, "a.c");
	assert.deepEqual(result, null, "got null");
});
QUnit.test("returns null if no object", function(assert){
	var result = ObjectTools.access(null, "a");
	assert.deepEqual(result, null, "got null");
});
QUnit.test("returns null if no accessor", function(assert){
	var result = ObjectTools.access({ a : "a" });
	assert.deepEqual(result, null, "got null");
});
QUnit.test("accesses property with preceeding .", function(assert){
	var result = ObjectTools.access({ a : "a" }, ".a");
	assert.deepEqual(result, "a", "got property");
});
QUnit.test("accesses deep property with preceeding .", function(assert){
	var result = ObjectTools.access({ a : { b : "b" } }, ".a.b");
	assert.deepEqual(result, "b", "got property");
});
QUnit.test("returns null if accessing property of null", function(assert){
	var result = ObjectTools.access({ a : { b : null } }, "a.b.c");
	assert.deepEqual(result, null, "got null");
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

QUnit.module(".clone");
QUnit.test("returns clone of value", function(assert){
	assert.equal(ObjectTools.clone(null), null);
	assert.equal(ObjectTools.clone("hello"), "hello");
	assert.equal(ObjectTools.clone(0), 0);
	assert.equal(ObjectTools.clone(true), true);
});
QUnit.test("returns clone of array", function(assert){
	let original = [1,2,3];
	let clone = ObjectTools.clone(original);
	assert.deepEqual(clone, [1,2,3]);
	assert.notOk(clone === original);
});
QUnit.test("returns clone of array with nesting", function(assert){
	var a = { a : 1 };
	var b = { b : 2 };
	var c = { c : 3 };
	let original = [a,b,c];
	let clone = ObjectTools.clone(original);
	assert.deepEqual(clone, [{a:1},{b:2},{c:3}]);
	assert.notOk(clone === original);
	assert.notOk(clone[0] === a);
	assert.notOk(clone[1] === b);
	assert.notOk(clone[3] === c);
});
QUnit.test("returns clone of object", function(assert){
	let original = { a: 1, b : 2, c : 3 };
	let clone = ObjectTools.clone(original);
	assert.deepEqual(clone, { a: 1, b : 2, c : 3 });
	assert.notOk(clone === original);
});
QUnit.test("returns clone of object with nesting", function(assert){
	var a = { a : 1 };
	var b = { b : 2 };
	var c = { c : 3 };
	let original = { a: a, b: b, c: c};
	let clone = ObjectTools.clone(original);
	assert.deepEqual(clone, {a:{a:1},b:{b:2},c:{c:3}});
	assert.notOk(clone === original);
	assert.notOk(clone.a === a);
	assert.notOk(clone.b === b);
	assert.notOk(clone.c === c);
});
