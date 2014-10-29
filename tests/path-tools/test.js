test("pathTools gets parentDirectory", function(){
	var parent = pathTools.getParentDirectory("path/to/file.ext");
	equal(parent, "path/to", "local file");

	var parent2 = pathTools.getParentDirectory("http://www.website.com/path/path2/path3/file.ext");
	equal(parent2, "http://www.website.com/path/path2/path3", "web url");
});

test("pathTools finds if absolute", function(){
	var test1 = pathTools.isAbsolute("path/to/file.ext");
	equal(test1, false, "relative local file");

	var test2 = pathTools.isAbsolute("C:/path/to/file.ext");
	equal(test2, true, "absolute local file");

	var test3 = pathTools.isAbsolute("http://www.website.com/path/path2/path3/file.ext");
	equal(test3, true, "absolute web url");

	var test4 = pathTools.isAbsolute("./path/path2/path3/file.ext");
	equal(test4, false, "relative web url");
});