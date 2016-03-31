QUnit.module(".getFunctionName");
QUnit.test("gets function name", function(assert){
	assert.equal(FunctionTools.getFunctionName("function noop(){}"), "noop", "function");
	assert.equal(FunctionTools.getFunctionName("function add(arg1, arg2){ return arg1 + arg2; }"), "add", "function with args");
});

QUnit.module(".getFunctionParams");
QUnit.test("gets function params", function(assert){
	assert.deepEqual(FunctionTools.getFunctionParams(FunctionTools.getFunctionParams), ["func"]);
	assert.deepEqual(FunctionTools.getFunctionParams(FunctionTools.debounce), ["func", "wait", "immediate"]);
});
/*
QUnit.module(".wait");
QUnit.test("waits for time ms", function(assert){
  var clock = sinon.useFakeTimers();
  var result = false;
  
	FunctionTools.wait(1000).then(function(){
    result = true;
	});
	
	clock.tick(2000);
	
	assert.ok(result, "timer fired");
	
  //clock.restore();
});
*/