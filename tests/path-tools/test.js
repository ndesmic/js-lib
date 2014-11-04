module(".parentDirectory");
test("gets parentDirectory", function(){
	var parent = pathTools.getParentDirectory("path/to/file.ext");
	equal(parent, "path/to", "local file");

	var parent2 = pathTools.getParentDirectory("http://www.website.com/path/path2/path3/file.ext");
	equal(parent2, "http://www.website.com/path/path2/path3", "web url");
});

module(".isAbsolute")
test("determines if absolute", function(){
	var test1 = pathTools.isAbsolute("path/to/file.ext");
	equal(test1, false, "relative local file");

	var test2 = pathTools.isAbsolute("C:/path/to/file.ext");
	equal(test2, true, "absolute local file");

	var test3 = pathTools.isAbsolute("http://www.website.com/path/path2/path3/file.ext");
	equal(test3, true, "absolute web url");

	var test4 = pathTools.isAbsolute("./path/path2/path3/file.ext");
	equal(test4, false, "relative web url");
});

module(".getFilename");
test("gets the filename", function(){
	var test1 = pathTools.getFilename("path/to/file.ext");
	equal(test1, "file.ext");

	var test2 = pathTools.getFilename("C:/path/to/file2.ext");
	equal(test2, "file2.ext");
});

module(".getFilenameNoExtension");
test("gets the filename", function(){
	var test1 = pathTools.getFilenameNoExtension("path/to/file.ext");
	equal(test1, "file");

	var test2 = pathTools.getFilenameNoExtension("C:/path/to/file2.ext");
	equal(test2, "file2");
});