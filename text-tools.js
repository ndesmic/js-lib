var TextTools = (function(){
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
  function printTextAsTable(str){
    var table = [];
    for(var i = 0; i < str.length; i++){
      table[i] = { char : str[i] };
    }
    console.table(table);
  }
  function printTextAsTableHorizontal(str){
    var table = [{}];
    for(var i = 0; i < str.length; i++){
      table[0][i] = str[i];
    }
    console.table(table);
  }
  return {
    findNonUtf8 : findNonUtf8,
    htmlEncode : htmlEncode,
    printTextAsTable : printTextAsTable,
    printTextAsTableHorizontal, printTextAsTableHorizontal
  };
})();