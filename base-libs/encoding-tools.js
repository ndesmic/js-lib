var EncodingTools = (function(){
  function findNonUtf8(text){
    var nonUtf = [];
    for(var i = 0; i < text.length; i++){
      var charCode = text.charCodeAt(i);
      if(charCode > 255){
        nonUtf.push({
          charCode : charCode,
          index : i,
          char : text[i]
        });
      }
    }
    return nonUtf;
  }
  function htmlEncode(text){
    var encodedText = text;
    for(var i = 0; i < text.length; i++){
      var charCode = text.charCodeAt(i);
      if(charCode > 255){
        encodedText = encodedText.replaceAll(text[i], "&#" + charCode + ";");
      }
    }
    return encodedText;
  }
  return {
    findNonUtf8 : findNonUtf8,
    htmlEncode : htmlEncode
  };
})();