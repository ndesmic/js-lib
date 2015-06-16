var PathTools = (function(){

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

  function getHashValue(key, url){
    if(url){
      url = url.split("#")[1];
    }else{
      url = window.location.hash;
    }
    var map = getQueryMap(url);
    return map[key];
  }

  function getQueryValue(key, url){
    if(url){
      url = url.split("?")[1];
    }else{
      url = window.location.search;
    }
    url = url.split("#")[0]; //remove hash
    var map = getQueryMap(url);
    return map[key];
  }

  function getQueryMap(queryString){
    var map = {};
    var andSplit = queryString.split("&");
    for(var i = 0; i < andSplit.length; i++){
      var equalSplit = andSplit[i].split("=");
      map[equalSplit[0]] = equalSplit[1];
    }
    return map;
  }
  
  function urlToHttps(url){
    url = url.split(":")[1];
    return "https:" + url;
  }

	return {
		getFilename : getFilename,
		getFilenameNoExtension : getFilenameNoExtension,
		getExtension : getExtension,
		getParentDirectory : getParentDirectory,
		isAbsolute : isAbsolute,
		removePreceedingSlash : removePreceedingSlash,
		removeQueryString : removeQueryString,
		removeHash : removeHash,
		getHashValue : getHashValue,
		getQueryValue : getQueryValue,
		urlToHttps : urlToHttps
	};

})();