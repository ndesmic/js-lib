var StringTools = (function(){
  function replaceAll(currentString, stringToReplace, replacement){
    return currentString.replace(new RegExp(stringToReplace, ["g"]), replacement);
  }
  return {
    replaceAll : replaceAll
  };
})();