QUnit.module(".getFunctionName");
QUnit.test("gets function name", function(assert){
	assert.equal(FunctionTools.getFunctionName("function noop(){}"), "noop", "function");
	assert.equal(FunctionTools.getFunctionName("function add(arg1, arg2){ return arg1 + arg2; }"), "add", "function with args");
});