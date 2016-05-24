var StringTools = (function(){
  //replace all occurances of string
  function replaceAll(currentString, stringToReplace, replacement){
    return currentString.replace(new RegExp(stringToReplace, ["g"]), replacement);
  }

  //this is ghetto hacked for now, handles only single characters and only a subset
  function stringRemove(text, thingsToRemove){
    var regExSymbols = [".", "$", "^"];
    thingsToRemove = [].concat(thingsToRemove);
    for(var i = 0; i < thingsToRemove.length; i++){
      var regex = thingsToRemove[i];
      if(regExSymbols.indexOf(regex) != -1){
        regex = "\\" + regex;
      }
      text = text.replace(new RegExp(regex, ["g"]), "");
    }
    return text;
  }

  //pads string to length with character
  function pad(text, length, padChar){
    text = text.toString();
    padChar = padChar || "0";
    var lengthToPad = length - text.length;

    if(lengthToPad > 0){
      for(var i = 0; i < lengthToPad; i++){
        text = padChar + text;
      }
    }
    return text;
  }

  //pads string end to length with character
  function padEnd(text, length, pad){
        text = text.toString();
        pad = pad || "0";
        var lengthToPad = length - text.length;

        if(lengthToPad > 0){
            for(var i = 0; i < lengthToPad; i++){
                text = text + pad;
            }
        }
        return text;
    }

    //truncates with ellipsis
    function truncate(text, length) {
        if (text.length > length) {
            var truncatedText = text.substring(0, length - 4);
            return truncatedText + "...";
        }
        return text;
    }

    //takes number and converts to bytes
    function getUnitSuffixedBytes(bytes, significantDecimal){
        var unitSuffix = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        var currentSuffixIndex = 0;

        while(bytes >= 1024){
            bytes = bytes / 1024;
            currentSuffixIndex++;
        }

        var rounded = significantDecimal === undefined ? bytes : bytes.toFixed(significantDecimal);

        return rounded + " " + unitSuffix[currentSuffixIndex];
    }

    //adds s to word if count > 1 or 0
    function pluralize(word, count){
        return count === 0 || count > 1 ? word + 's' : word;
    }

    //capitalizes first letter
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function lowerCaseFirst(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    //capitalizes all words
    function capitalizeAll(str) {
        return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    function kebabCase(str){
        return str.replace(/\s+/g, "-").toLowerCase();
    }

    //generates a random string
    function generateRandomString(length){
        var s = Math.random().toString(36).substring(2);
        while(s.length < length){  //possible to get a round number like 0.5 or run out of digits so append
            s += Math.random().toString(36).substring(2);
        }
        return s.substring(0,length);
    }

    //trims length from end of string
    function stringTrimEnd (str, length) {
        return str.substring(0, str.length - length);
    }

    //checks if string ends with string
    function stringEndsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function getCodes(str){
        var codeStr = "";
        for(var i = 0; i < str.length; i++){
            codeStr += str.charCodeAt(i) + ",";
        }
        return codeStr;
    }

    function getEscapes(str){
        var codeStr = "";
        for(var i = 0; i < str.length; i++){
            codeStr += getEscape(str[i]);
        }
        return codeStr;
    }

    function getEscape(char){
        if(char.charCodeAt(0) == 10){
            return "\\n";
        }
        if(char.charCodeAt(0) == 9){
            return "\\t";
        }
        if(char.charCodeAt(0) == 13){
            return "\\r";
        }
        if(char.charCodeAt(0) == 32){
            return "\\s";
        }
        return char;
    }

  function isAlphanumeric(character){
    return /^[a-z0-9]+$/i.test(character);
  }

  function isNumber(str){
    if(str === null || str === ""){
      return false;
    }
    return !isNaN(str);
  }

  function isAlpha(character){
    return /^[a-zA-Z]+$/.test(character);
  }

  function isWhitespace(char){
    var whitespace = [
      String.fromCharCode(13), //carriage return
      String.fromCharCode(10), //new line
      String.fromCharCode(32), //space
      String.fromCharCode(9)   //tab
    ];
    return whitespace.indexOf(char) != -1;
  }

  function spliceString(str, index, count, add) {
      return str.slice(0, index) + add + str.slice(index + count);
  }

  function printStringAsTable(str){
      var table = [];
      for(var i = 0; i < str.length; i++){
          table[i] = { char : str[i] };
      }
      console.table(table);
  }

  function printStringAsTableHorizontal(str){
      var table = [{}];
      for(var i = 0; i < str.length; i++){
          table[0][i] = str[i];
      }
      console.table(table);
  }

  function stringToFileUrl(text){
    var file = new Blob([text], {type:'text/plain'});
		return Url.createObjectURL(file);
  }

  function lengthChunk(text, chunkLength){
    var chunks = [];
    var remaining = text;

    while(remaining.length > chunkLength){
      chunks.push(remaining.substring(0, chunkLength));
      remaining = remaining.substr(chunkLength);
    }

    chunks.push(remaining);
    return chunks;
  }

  function countChunk(text, count){
    var chunks = [];
    var chunkLength = Math.ceil(text.length / count);

    for(var i = 0; i < count; i++){
      chunks.push(text.substring(i*chunkLength, (i+1)*chunkLength));
    }

    return chunks;
  }

  function lengthChunkWords(text, chunkLength){
    var chunks = [];
    var words = text.split(" ");
    var currentChunk = "";
    var i = 0;

    while(i < words.length){
      currentChunk = "";

      while(i < words.length && (currentChunk.length - 1) + words[i].length <= chunkLength){
        currentChunk += words[i] + " ";
        i++;
      }

      if(i < words.length && words[i].length > chunkLength){
        throw "a word was bigger than chunk length: " + chunkLength;
      }
      currentChunk = stringTrimEnd(currentChunk, 1);

      chunks.push(currentChunk);
    }

    return chunks;
  }

  function htmlStringToDom(htmlString){
    	parser = new DOMParser();
	    return parser.parseFromString(htmlString, "text/html");
  }

  function transformToken(text, regex, replaceFunc){
		var matches = text.match(regex);
		if(!matches){
		  return text;
		}
		for(var i = 0; i < matches.length; i++){
			text = text.replace(matches[i], replaceFunc(matches[i]));
		}
		return text;
	}

	function splitCamelCase(text){
	  return text.replace(/([A-Z])/g, ' $1').split(" ");
	}

	function camelCaseToDashed(text){
	  return text.replace(/([A-Z])/g, '-$1').toLowerCase();
	}

	function dashedToCamelCase(text){
	  var parts = text.split("-");
	  for(var i = 0; i < parts.length; i++){
	    if(i === 0){
	      continue;
	    }
	    if(parts[i].length > 0){
	      parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
	    }
	  }
	  return parts.join("");
	}

	function collapseWhitespace(text){
	  return text.replace(/\s{2,}/g,' ');
	}

	function splitWhitespace(text){
	  var split = [];
	  var buffer = "";
	  var quoted = false;
	  var readWhitespace = false;
	  for(var i = 0; i < text.length; i++){
	    if(isWhitespace(text[i]) && !quoted && !readWhitespace){
	      split.push(buffer);
	      buffer = "";
	      readWhitespace = true;
	    }else if(isWhitespace(text[i]) && !quoted && readWhitespace){
	      continue;
	    }else if(text[i] == "\"" && !quoted){
	      quoted = true;
	      readWhitespace = false;
	    }else if(text[i] == "\"" && quoted){
	      quoted = false;
	      readWhitespace = false;
	    }else{
	      buffer += text[i];
	      readWhitespace = false;
	    }
	  }
	  if(buffer){
	    split.push(buffer);
	  }

	  return split;
	}

	function templateString(text, values){
	  for(var key in values){
	    var regex = new RegExp("\\${" + key + "}", "g");
	    text = text.replace(regex, values[key]);
	  }
	  return text;
	}

	function parseLiteralList(list){
		return list.split(/(?!\B"[^"]*),(?![^"]*"\B)/g).map(function(item){
		  var value = item.trim();
		  if(isNumber(value)){
		    return parseFloat(value);
		  }
		  if(value === "false"){
		    return false;
		  }
		  if(value === "true"){
		    return true;
		  }
		  if(value === "null"){
		    return null;
		  }
		  if(value === "undefined"){
		    return undefined;
		  }
		  return value.replace(/\"/g, "");
		});
	}

  return {
    replaceAll : replaceAll,
    stringRemove : stringRemove,
    pad : pad,
    padEnd : padEnd,
    truncate : truncate,
    getUnitSuffixedBytes : getUnitSuffixedBytes,
    pluralize : pluralize,
    capitalizeFirst : capitalizeFirst,
    lowerCaseFirst : lowerCaseFirst,
    kebabCase : kebabCase,
    capitalizeAll : capitalizeAll,
    generateRandomString : generateRandomString,
    stringTrimEnd : stringTrimEnd,
    stringEndsWith : stringEndsWith,
    getCodes : getCodes,
    getEscapes : getEscapes,
    isAlphanumeric : isAlphanumeric,
    isNumber : isNumber,
    isAlpha : isAlpha,
    isWhitespace : isWhitespace,
    spliceString : spliceString,
    printStringAsTable : printStringAsTable,
    printStringAsTableHorizontal : printStringAsTableHorizontal,
    stringToFileUrl : stringToFileUrl,
    lengthChunk : lengthChunk,
    countChunk : countChunk,
    lengthChunkWords : lengthChunkWords,
    htmlStringToDom : htmlStringToDom,
    transformToken : transformToken,
    splitCamelCase : splitCamelCase,
    camelCaseToDashed : camelCaseToDashed,
    dashedToCamelCase : dashedToCamelCase,
    collapseWhitespace : collapseWhitespace,
    splitWhitespace : splitWhitespace,
    templateString : templateString,
    parseLiteralList : parseLiteralList
  };
})();
