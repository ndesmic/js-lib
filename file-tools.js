var FileTools = (function(){
  function download(url, fileName){
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  }
  return {
    download : download
  };
})();