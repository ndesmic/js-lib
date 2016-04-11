QUnit.module(".stringRemove");
QUnit.test("removes a word", function(assert){
  var text = StringTools.stringRemove("lorem ipsum", "ipsum");
	assert.equal(text, "lorem ", "removed first");
});
QUnit.test("does not bork on periods", function(assert){
  var text = StringTools.stringRemove("lorem", ["."]);
	assert.equal(text, "lorem", "removed none");
});
QUnit.test("removes a word (multi)", function(assert){
  var text = StringTools.stringRemove("lorem ipsum, lorem ipsum", "ipsum");
	assert.equal(text, "lorem , lorem ", "removed multi");
});
QUnit.test("removes multiple words", function(assert){
  var text = StringTools.stringRemove("hello lorem ipsum world", ["hello", "ipsum"]);
	assert.equal(text, " lorem  world", "removed multiple words");
});

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

QUnit.module(".titleCase");
let tests = [
  { args : ["helloworld"], result : "Helloworld" },
  { args : ["HELLOWORLD"], result : "Helloworld" },
  { args : ["hElLowORld"], result : "Helloworld" }
];
tests.forEach(function(test){
  QUnit.test("returns titlecase text", function(assert){
    let text = StringTools.titleCase.apply(null, test.args);
	  assert.equal(text, test.result, "titlecases");
  });
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
QUnit.module(".lengthChunkWords");
QUnit.test("chunks words (partial fit)", function(assert){
	var chunks = StringTools.lengthChunkWords("12345 123456", 6);
	assert.equal(chunks.length, 2, "length correct");
	assert.equal(chunks[0], "12345", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("chunks words (complete fit)", function(assert){
	var chunks = StringTools.lengthChunkWords("123456 123456", 6);
	assert.equal(chunks.length, 2, "length correct");
	assert.equal(chunks[0], "123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.test("throws error if word too big", function(assert){
  try{
    StringTools.lengthChunkWords("1234567", 6);
  }catch(e){
    assert.ok(true, "threw exception");
    return;
  }
  assert.notOk(false, "did not throw");
});
QUnit.test("chunks words (single)", function(assert){
	var chunks = StringTools.lengthChunkWords("123456", 6);
	assert.equal(chunks.length, 1, "length correct");
	assert.equal(chunks[0], "123456", "got first chunk");
});
QUnit.test("chunks words (multiple)", function(assert){
	var chunks = StringTools.lengthChunkWords("123456 123456 123456", 13);
	assert.equal(chunks.length, 2, "length correct");
	assert.equal(chunks[0], "123456 123456", "got first chunk");
	assert.equal(chunks[1], "123456", "got second chunk");
});
QUnit.module(".htmlStringToDom");
QUnit.test("changes html string into DOM elements", function(assert){
	var dom = StringTools.htmlStringToDom("<div><span></span></div>");
	var element = dom.querySelector("span");
	assert.ok(!!element, "go element");
});

QUnit.module(".transformToken");
QUnit.test("changes token", function(assert){
	var result = StringTools.transformToken("apple hello orange world", /(apple|orange)/g, function(item){
	  return "big " + item;
	});
	assert.equal(result, "big apple hello big orange world");
});
QUnit.test("doesn't modify when no token match", function(assert){
	var result = StringTools.transformToken("apple hello orange world", /(pineapple)/g, function(item){
	  return "big " + item;
	});
	assert.equal(result, "apple hello orange world");
});

QUnit.module(".isNumber");
QUnit.test("returns true if number", function(assert){
	var result = StringTools.isNumber("1");
	assert.ok(result, "is number");
	var result2 = StringTools.isNumber("1.23");
	assert.ok(result2, "is number");
	var result3 = StringTools.isNumber("-1");
	assert.ok(result3, "is number");
});
QUnit.test("returns false if not number", function(assert){
	var result = StringTools.isNumber("abc");
	assert.notOk(result, "is not number text");
	var result2 = StringTools.isNumber("");
	assert.notOk(result2, "is not number empty string");
	var result3 = StringTools.isNumber(null);
	assert.notOk(result3, "is not number null");
	var result4 = StringTools.isNumber(undefined);
	assert.notOk(result4, "is not number undefined");
	var result5 = StringTools.isNumber({});
	assert.notOk(result5, "is not number object");
});
QUnit.module(".splitCamelCase");
QUnit.test("splits camel case string", function(assert){
	var result = StringTools.splitCamelCase("abcAbc");
	assert.deepEqual(result, ["abc", "Abc"]);
	
	var result2 = StringTools.splitCamelCase("abcAbcXyz");
	assert.deepEqual(result2, ["abc", "Abc", "Xyz"]);
});
QUnit.module(".camelCaseToDashed");
QUnit.test("converts camel case to dashed", function(assert){
	var result = StringTools.camelCaseToDashed("abcAbc");
	assert.equal(result, "abc-abc");
	
	var result2 = StringTools.camelCaseToDashed("abcAbcXyz");
	assert.equal(result2, "abc-abc-xyz");
});
QUnit.module(".dashedToCamelCase");
QUnit.test("converts dashed to camel case", function(assert){
	var result = StringTools.dashedToCamelCase("abc-abc");
	assert.equal(result, "abcAbc");
	
	var result2 = StringTools.dashedToCamelCase("abc-Abc-Xyz");
	assert.equal(result2, "abcAbcXyz");
});
QUnit.module(".dashedToCamelCase");
QUnit.test("converts dashed to camel case", function(assert){
	var result = StringTools.dashedToCamelCase("abc-abc");
	assert.equal(result, "abcAbc");
	
	var result2 = StringTools.dashedToCamelCase("abc-Abc-Xyz");
	assert.equal(result2, "abcAbcXyz");
});



QUnit.module(".collapseWhitespace");
QUnit.test("collapse whitespace", function(assert){
	var result = StringTools.collapseWhitespace("abc   abc");
	assert.equal(result, "abc abc");
	
	var result2 = StringTools.collapseWhitespace("abc    abc");
	assert.equal(result2, "abc abc");
});

QUnit.module(".splitWhitespace");
QUnit.test("splits whitespace (basic)", function(assert){
	var result = StringTools.splitWhitespace("abc abc");
	assert.deepEqual(result, ["abc", "abc"]);
	
	var result2 = StringTools.splitWhitespace("abc  Abc Xyz");
	assert.deepEqual(result2, ["abc", "Abc", "Xyz"]);
});
QUnit.test("splits whitespace (tabs)", function(assert){
	var result = StringTools.splitWhitespace("abc\tabc");
	assert.deepEqual(result, ["abc", "abc"]);
});
QUnit.test("splits whitespace (new line)", function(assert){
	var result = StringTools.splitWhitespace("abc\nabc");
	assert.deepEqual(result, ["abc", "abc"]);
});
QUnit.test("splits whitespace (new line + feed)", function(assert){
	var result = StringTools.splitWhitespace("abc\r\nabc");
	assert.deepEqual(result, ["abc", "abc"]);
});
QUnit.test("splits whitespace (multi)", function(assert){
	var result = StringTools.splitWhitespace("abc  abc");
	assert.deepEqual(result, ["abc", "abc"]);
	
	var result2 = StringTools.splitWhitespace("abc   Abc  Xyz");
	assert.deepEqual(result2, ["abc", "Abc", "Xyz"]);
});
QUnit.test("splits whitespace (but not quoted text)", function(assert){
	var result = StringTools.splitWhitespace('"abc abc"');
	assert.deepEqual(result, ["abc abc"]);
	
	var result2 = StringTools.splitWhitespace('"abc  Abc"  Xyz');
	assert.deepEqual(result2, ["abc  Abc", "Xyz"]);
});

QUnit.module(".templateString");
QUnit.test("templates value", function(assert){
	var result = StringTools.templateString("hello ${value} world!", { value : "lorem" });
	assert.equal(result, "hello lorem world!");
});
QUnit.test("templates values", function(assert){
	var result = StringTools.templateString("hello ${value} ${foo} world!", { value : "lorem", foo : "ipsum" });
	assert.equal(result, "hello lorem ipsum world!");
});
QUnit.test("templates value multiple times", function(assert){
	var result = StringTools.templateString("hello ${value} ${value} world!", { value : "lorem", foo : "ipsum" });
	assert.equal(result, "hello lorem lorem world!");
});