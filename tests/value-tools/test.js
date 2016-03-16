QUnit.module(".coalesce");

var tests = [
  { args : [1,2,3], result : 1 },
  { args : [null, 1, 2], result : 1 },
  { args : [undefined, 1, 2], result : 1 },
  { args : [null, 0, undefined], result : 0 },
  { args : [undefined, null, 1], result : 1 },
  { args : ["", null, 1], result : "" },
  { args : [null, "", 1], result : "" },
  { args : [null, null, null], result : undefined },
];

tests.forEach((test) => {
  QUnit.test("coaleses to", function(assert){
  	var result = ValueTools.coalesce(...test.args);
  	assert.equal(result, test.result, "value");
  });
});