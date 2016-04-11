QUnit.module(".getCaptureMatches");

var tests = [
  { args : ["t(e)(s)t", /\((.)\)/], result : undefined },
  { args : ["t(e)(s)t", /\((.)\)/g], result : ["e", "s"] },
  { args : ["test test test", /\((.)\)/g], result : [] },
  { args : ["t(e)(s)(somestuff)t", /\((.*?)\)/g], result : ["e", "s", "somestuff"] },
];

tests.forEach((test) => {
  QUnit.test("should get capture groups", function(assert){
  	var result = RegexTools.getCaptureMatches(...test.args);
  	assert.deepEqual(result, test.result, "groups");
  });
});