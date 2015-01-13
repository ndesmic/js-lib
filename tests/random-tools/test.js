QUnit.module(".getInt");
QUnit.test("gets random integer", function(assert){
  for(var i = 0; i < 100; i++){
	  var value = RandomTools.getInt(10); //should get 0 - 9
	  assert.ok(value < 10 && value >= 0, "in range");
  }
});
QUnit.module(".getBool");
QUnit.test("gets random bool", function(assert){
  var valuesTrue = [];
  var valuesFalse = [];
  for(var i = 0; i < 100; i++){
	  var value = RandomTools.getBool();
	  assert. ok(value === true || value === false, "in range");
	  if(value){
	    valuesTrue.push(value);
	  }else{
	    valuesFalse.push(value);
	  }
  }
  assert.ok(valuesTrue.length > 25 && valuesTrue.length < 75, "good distribution (may fail rarely because it's random)");
  assert.ok(valuesFalse.length > 25 && valuesFalse.length < 75, "good distribution (may fail rarely because it's random)");
});
QUnit.module(".getOption");
QUnit.test("gets random option", function(assert){
  var valuesOrange = [];
  var valuesApple = [];
  var valuesBanana = [];
  for(var i = 0; i < 150; i++){
	  var value = RandomTools.getOption(["orange", "apple", "banana"]);
	  assert.ok(value == "orange" || value == "apple" || value == "banana", "in range");
	  if(value == "apple"){
	    valuesApple.push(value);
	  }else if(value == "orange"){
	    valuesOrange.push(value);
	  }else{
	    valuesBanana.push(value);
	  }
  }
  assert.ok(valuesOrange.length > 25 && valuesOrange.length < 75, "good distribution (may fail rarely because it's random)");
  assert.ok(valuesApple.length > 25 && valuesApple.length < 75, "good distribution (may fail rarely because it's random)");
  assert.ok(valuesBanana.length > 25 && valuesBanana.length < 75, "good distribution (may fail rarely because it's random)");
});