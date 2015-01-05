module(".extend");
test("extends object", function(){
	var result = ObjectTools.extend({ a : "a" }, { b : "b" });
	deepEqual(result, { a : "a", b : "b" }, "extended object");
});
test("overwrites object props", function(){
	var result = ObjectTools.extend({ a : "a" }, { a : "b" });
	deepEqual(result, { a : "b" }, "overwrote prop");
});