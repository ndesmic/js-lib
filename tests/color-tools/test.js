QUnit.module(".getGradientPoint");
QUnit.test("should get color of gradient", function(assert){
  var result1 = ColorTools.getGradientPoint({ red: 0, green: 0, blue: 0}, { red: 255, green: 255, blue: 255}, 0);
  var result2 = ColorTools.getGradientPoint({ red: 0, green: 0, blue: 0}, { red: 255, green: 255, blue: 255}, 0.5);
  var result3 = ColorTools.getGradientPoint({ red: 0, green: 0, blue: 0}, { red: 255, green: 255, blue: 255}, 1);
  
  assert.equal(result1.red, 0);
  assert.equal(result1.green, 0);
  assert.equal(result1.blue, 0);
  assert.equal(result2.red, 127.5);
  assert.equal(result2.green, 127.5);
  assert.equal(result2.blue, 127.5);
  assert.equal(result3.red, 255);
  assert.equal(result3.green, 255);
  assert.equal(result3.blue, 255);
  
  var result4 = ColorTools.getGradientPoint({ red: 0, green: 0, blue: 0}, { red: 255, green: 0, blue: 0}, 0);
  var result5 = ColorTools.getGradientPoint({ red: 0, green: 0, blue: 0}, { red: 255, green: 0, blue: 0}, 0.5);
  var result6 = ColorTools.getGradientPoint({ red: 0, green: 0, blue: 0}, { red: 255, green: 0, blue: 0}, 1);
  
  assert.equal(result4.red, 0);
  assert.equal(result4.green, 0);
  assert.equal(result4.blue, 0);
  assert.equal(result5.red, 127.5);
  assert.equal(result5.green, 0);
  assert.equal(result5.blue, 0);
  assert.equal(result6.red, 255);
  assert.equal(result6.green, 0);
  assert.equal(result6.blue, 0);
});