var pathTools = (function(){

	function getFilename(path){
		var split = path.split("/");
		return split[split.length - 1];
	}

	function getFilenameNoExtension(path){
		var split = path.split("/");
		var filename = split[split.length - 1];
		var filenameSplit = filename.split(".");
		return filenameSplit[0];
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

	function removePreceedingSlash(path){
    return path[0] == "/" ?  path.substr(1) : path;
  }

  function removeQueryString(path){
    return path.split("?")[0];
  }

  function removeHash(path){
    return path.split("#")[0];
  }

	return {
		getFilename : getFilename,
		getFilenameNoExtension : getFilenameNoExtension,
		getExtension : getExtension,
		getParentDirectory : getParentDirectory,
		isAbsolute : isAbsolute,
		removePreceedingSlash : removePreceedingSlash,
		removeQueryString : removeQueryString,
		removeHash : removeHash
	};

})();