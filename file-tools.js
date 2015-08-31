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
  return {
    download : download
  };
})();