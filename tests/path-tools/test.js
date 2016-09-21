QUnit.module(".parentDirectory");
QUnit.test("gets parentDirectory", function(assert){
	var parent = PathTools.getParentDirectory("path/to/file.ext");
	assert.equal(parent, "path/to", "local file");

	var parent2 = PathTools.getParentDirectory("http://www.website.com/path/path2/path3/file.ext");
	assert.equal(parent2, "http://www.website.com/path/path2/path3", "web url");
});

QUnit.module(".isAbsolute");
QUnit.test("determines if absolute", function(assert){
	var test1 = PathTools.isAbsolute("path/to/file.ext");
	assert.equal(test1, false, "relative local file");

	var test2 = PathTools.isAbsolute("C:/path/to/file.ext");
	assert.equal(test2, true, "absolute local file");

	var test3 = PathTools.isAbsolute("http://www.website.com/path/path2/path3/file.ext");
	assert.equal(test3, true, "absolute web url");

	var test4 = PathTools.isAbsolute("./path/path2/path3/file.ext");
	assert.equal(test4, false, "relative web url");
});

QUnit.module(".getFilename");
QUnit.test("gets the filename", function(assert){
	var test1 = PathTools.getFilename("path/to/file.ext");
	assert.equal(test1, "file.ext");

	var test2 = PathTools.getFilename("C:/path/to/file2.ext");
	assert.equal(test2, "file2.ext");
});

QUnit.module(".getFilenameNoExtension");
QUnit.test("gets the filename", function(assert){
	var test1 = PathTools.getFilenameNoExtension("path/to/file.ext");
	assert.equal(test1, "file");

	var test2 = PathTools.getFilenameNoExtension("C:/path/to/file2.ext");
	assert.equal(test2, "file2");
});

QUnit.module(".getQueryValue");
QUnit.test("gets query value", function(assert){
	var test1 = PathTools.getQueryValue("a", "http://domain/page?a=24");
	assert.equal(test1, "24");

	var test2 = PathTools.getQueryValue("b", "http://domain/page?a=24&b=64");
	assert.equal(test2, "64");
});
QUnit.test("gets query value but not hash", function(assert){
	var test1 = PathTools.getQueryValue("a", "http://domain/page?a=24#hash=32");
	assert.equal(test1, "24");
});
QUnit.module(".urlToHttps");
QUnit.test("changes http url to https", function(assert){
	var test1 = PathTools.urlToHttps("http://domain.com");
	assert.equal(test1, "https://domain.com");
});
QUnit.test("keeps https url https", function(assert){
	var test1 = PathTools.urlToHttps("https://domain.com");
	assert.equal(test1, "https://domain.com");
});

QUnit.module(".resolveRelativeUrl");
[
	{ url : "a", base : "foo://bar/", result : "foo://bar/a" },
	{ url : "../a", base : "foo://bar/", result : "foo://a" }
].forEach(test => {
	QUnit.test("should resolve url", function(assert){
		var result = PathTools.resolveRelativeUrl(test.url, test.base);
		assert.equal(result, test.result);
	});
});
