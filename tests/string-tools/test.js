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
QUnit.module(".lengthChunk");
QUnit.test("chunks string (remainder)", function(assert){
	var chunks = StringTools.lengthChunk("lorem ipsum", 5);
	assert.equal(chunks.length, 3);
	assert.equal(chunks[0], "lorem", "got first chunk");
	assert.equal(chunks[1], " ipsu", "got second chunk");
	assert.equal(chunks[2], "m", "got third chunk");
});
QUnit.test("chunks string (no remainder)", function(assert){
	var chunks = StringTools.lengthChunk("123456123456", 6);
	assert.equal(chunks.length, 2);
	assert.equal(chunks[0], "123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("chunks string (single chunk)", function(assert){
	var chunks = StringTools.lengthChunk("123456", 10);
	assert.equal(chunks.length, 1);
	assert.equal(chunks[0], "123456", "got first chunk");
});
QUnit.module(".countChunk");
QUnit.test("chunks string (single chunk)", function(assert){
	var chunks = StringTools.countChunk("123456", 1);
	assert.equal(chunks.length, 1);
	assert.equal(chunks[0], "123456", "got first chunk");
});
QUnit.test("chunks string (2 chunks, no remainder)", function(assert){
	var chunks = StringTools.countChunk("123456123456", 2);
	assert.equal(chunks.length, 2);
	assert.equal(chunks[0], "123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("chunks string (2 chunks, remainder)", function(assert){
	var chunks = StringTools.countChunk("1234561234567", 2);
	assert.equal(chunks.length, 2);
	assert.equal(chunks[0], "1234561", "got first chunk");
	assert.equal(chunks[1], "234567", "got second chunk");
});