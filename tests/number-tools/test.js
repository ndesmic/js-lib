QUnit.module(".toNearest");

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