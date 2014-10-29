var pathTools = (function(){

	function getFilename(path){
		var split = path.split("/");
		return split[split.length - 1];
	}

	function getExtension(path){
		var split = path.split(".");
		return split[split.length - 1];
	}

	function getParentDirectory(path){
	  return path.substring(0, path.lastIndexOf("/"));
	}

	function isAbsolute(path){
	  return path.indexOf(":") != -1;
	}

	return {
		getFilename : getFilename,
		getExtension : getExtension,
		getParentDirectory : getParentDirectory,
		isAbsolute : isAbsolute
	};

})();