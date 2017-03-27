QUnit.module(".getTokens");
QUnit.test("should get tokens", function(assert){
	const tokenizer = Tokenizer.create([
		{ type: "DECLARATION", match: /var/ },
		{ type: "BINDING", match: /./ },
		{ type: "ASSIGNMENT", regex: /=/ },
		{ type: "NUMBER", regex: /\d+/ }
		{ type: "END_OF_LINE", regex: /;/ }
	]);
	let result = tokenizer.getTokens("var i = 1000;");
	assert.equal(result.next()value.type, "DECLARATION", "got token");
	assert.equal(result.next()value.type, "BINDING", "got token");
	assert.equal(result.next()value.type, "ASSIGNMENT", "got token");
	assert.equal(result.next()value.type, "NUMBER", "got token");
	assert.equal(result.next()value.type, "END_OF_LINE", "got token");
	assert.ok(result.next().done, "got end");
});
