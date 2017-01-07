QUnit.module(".round");
var tests = [
  { args : [1, 3], result : 0 },
  { args : [2,3], result : 3 },
  { args : [0, 2], result : 0 },
  { args : [1, 2], result : 2 },
  { args : [5, 10], result : 10 },
  { args : [8, 10], result : 10 },
  { args : [10, 10], result : 10 },
  { args : [15, 10], result : 20 },
  { args : [19, 10], result : 20 },
  { args : [12, 10], result : 10 }
];

tests.forEach((test) => {
  QUnit.test("round to nearest", function(assert){
  	var result = NumberTools.round(...test.args);
  	assert.equal(result, test.result, "rounded number");
  });
});

QUnit.module(".parseIntOrDefault");
QUnit.test("should parse", function(assert){
  var result = NumberTools.parseIntOrDefault("123");
  assert.equal(result, 123, "parsed");
});
QUnit.test("should default", function(assert){
  var result = NumberTools.parseIntOrDefault("dog", "rainbow");
  assert.equal(result, "rainbow", "defaulted");
});
QUnit.test("should default with default", function(assert){
  var result = NumberTools.parseIntOrDefault("cat");
  assert.equal(result, null, "defaulted");
});

QUnit.module(".clamp");
QUnit.test("should clamp value low", function(assert){
  var result = NumberTools.clamp(8, 10, 20);
  assert.equal(result, 10, "clamped low");
});
QUnit.test("should clamp value high", function(assert){
  var result = NumberTools.clamp(25, 10, 20);
  assert.equal(result, 20, "clamped high");
});
QUnit.test("should not clamp value", function(assert){
  var result = NumberTools.clamp(17, 10, 20);
  assert.equal(result, 17, "not clamped");
});
