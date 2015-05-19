QUnit.module(".capitalizeFirst");
QUnit.test("capitalizes first word", function(assert){
  var capitalText = StringTools.capitalizeFirst("lorem");
	assert.equal(capitalText, "Lorem", "capitalizes first word (one)");
	
	var capitalText2 = StringTools.capitalizeFirst("lorem ipsum");
	assert.equal(capitalText2, "Lorem ipsum", "capitalizes first word (multi)");
});
QUnit.module(".capitalizeAll");
QUnit.test("capitalizes one word", function(assert){
  var capitalText = StringTools.capitalizeAll("lorem");
	assert.equal(capitalText, "Lorem", "capitalizes one word");
});
QUnit.test("capitalizes multiple words", function(assert){
	var capitalText = StringTools.capitalizeAll("lorem ipsum");
	assert.equal(capitalText, "Lorem Ipsum", "capitalizes multiple words");
});
QUnit.test("capitalizes with leading space", function(assert){
	var capitalText = StringTools.capitalizeAll(" lorem ipsum");
	assert.equal(capitalText, " Lorem Ipsum", "capitalizes with leading space");
});