var StringTools = (function(){
  function replaceAll(currentString, stringToReplace, replacement){
    return currentString.replace(new RegExp(toReplace, ["g"]), replacement);
  }
  return {
    replaceAll : replaceAll
  };
})();