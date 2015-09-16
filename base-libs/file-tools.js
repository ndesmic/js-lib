var FileTools = (function(){
  function download(url, fileName){
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  }
  function createFile(text, mime){
		var dataUrl = "data:" + mime + ";utf-8,";
		dataUrl += text;
		return dataUrl;
	}
	
	function createEmptyFile(mime){
		return "data:" + mime + ";utf-8,";
	}
	function readAsArrayBuffer(file){
	  return new Promise(function(resolve, reject){
	      var reader = new FileReader();
		    reader.onload = function(e){
		      resolve(e.target.result);
		    };
		    reader.onerror = function(e){
		      reject(e);
		    };
		    reader.readAsArrayBuffer(file);
	  });
	}
	function readAsJson(file){
	  return new Promise(function(resolve, reject){
	      var reader = new FileReader();
		    reader.onload = function(e){
		      resolve(JSON.parse(e.target.result));
		    };
		    reader.onerror = function(e){
		      reject(e);
		    };
		    reader.readAsText(file);
	  });
	}
  return {
    download : download,
    readAsArrayBuffer : readAsArrayBuffer,
    readAsJson : readAsJson
  };
})();