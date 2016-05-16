QUnit.module(".degreesToRadians");

var tests = [
  { args : [0], result : 0 },
  { args : [45], result : Math.PI/4 },
  { args : [90], result : Math.PI/2 },
  { args : [180], result : Math.PI },
  { args : [270], result : 3 * Math.PI/2 },
  { args : [360], result : 2 * Math.PI }
];

tests.forEach(test => {
  QUnit.test(`coverts to radians ${JSON.stringify(test.args)}`, function(assert){
  	var result = GeometryTools.degreesToRadians(...test.args);
  	assert.equal(result, test.result, "value");
  });
});

var tests = [
  { args : [0], result : 0 },
  { args : [Math.PI/4], result : 45 },
  { args : [Math.PI/2], result : 90 },
  { args : [Math.PI], result : 180 },
  { args : [3 * Math.PI/2], result : 270 },
  { args : [2 * Math.PI], result : 360 }
];

tests.forEach(test => {
  QUnit.test(`coverts to radians ${JSON.stringify(test.args)}`, function(assert){
  	var result = GeometryTools.radiansToDegrees(...test.args);
  	assert.equal(result, test.result, "value");
  });
});