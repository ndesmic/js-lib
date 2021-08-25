//replace all occurances of string
export function replaceAll(currentString, stringToReplace, replacement) {
    return currentString.replace(new RegExp(stringToReplace, ["g"]), replacement);
}

    //this is ghetto hacked for now, handles only single characters and only a subset
export function stringRemove(text, thingsToRemove) {
    var regExSymbols = [".", "$", "^"];
    thingsToRemove = [].concat(thingsToRemove);
    for (var i = 0; i < thingsToRemove.length; i++) {
        var regex = thingsToRemove[i];
        if (regExSymbols.indexOf(regex) != -1) {
            regex = "\\" + regex;
        }
        text = text.replace(new RegExp(regex, ["g"]), "");
    }
    return text;
}
//pads string to length with character
export function pad(text, length, padChar) {
    text = text.toString();
    padChar = padChar || "0";
    var lengthToPad = length - text.length;
    if (lengthToPad > 0) {
        for (var i = 0; i < lengthToPad; i++) {
            text = padChar + text;
        }
    }
    return text;
}
//pads string end to length with character
export function padEnd(text, length, pad) {
    text = text.toString();
    pad = pad || "0";
    var lengthToPad = length - text.length;
    if (lengthToPad > 0) {
        for (var i = 0; i < lengthToPad; i++) {
            text = text + pad;
        }
    }
    return text;
}
//truncates with ellipsis
export function truncate(text, length) {
    if (text.length > length) {
        var truncatedText = text.substring(0, length - 4);
        return truncatedText + "...";
    }
    return text;
}
//takes number and converts to bytes
export function getUnitSuffixedBytes(bytes, significantDecimal) {
    var unitSuffix = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var currentSuffixIndex = 0;
    while (bytes >= 1024) {
        bytes = bytes / 1024;
        currentSuffixIndex++;
    }
    var rounded = significantDecimal === undefined ? bytes : bytes.toFixed(significantDecimal);
    return rounded + " " + unitSuffix[currentSuffixIndex];
}
//adds s to word if count > 1 or 0
export function pluralize(word, count) {
    return count === 0 || count > 1 ? word + 's' : word;
}
//capitalizes first letter
export function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function lowerCaseFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
//capitalizes all words
export function capitalizeAll(str) {
    return str.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
    });
}
export function kebabCase(str) {
    return str.replace(/\s+/g, "-").toLowerCase();
}
//generates a random string
export function generateRandomString(length) {
    var s = Math.random().toString(36).substring(2);
    while (s.length < length) { //possible to get a round number like 0.5 or run out of digits so append
        s += Math.random().toString(36).substring(2);
    }
    return s.substring(0, length);
}
//trims length from end of string
export function stringTrimEnd(str, length) {
    return str.substring(0, str.length - length);
}
//checks if string ends with string
export function stringEndsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
export function getCodes(str) {
    var codeStr = "";
    for (var i = 0; i < str.length; i++) {
        codeStr += str.charCodeAt(i) + ",";
    }
    return codeStr;
}
export function getEscapes(str) {
    var codeStr = "";
    for (var i = 0; i < str.length; i++) {
        codeStr += getEscape(str[i]);
    }
    return codeStr;
}
export function getEscape(char) {
    if (char.charCodeAt(0) == 10) {
        return "\\n";
    }
    if (char.charCodeAt(0) == 9) {
        return "\\t";
    }
    if (char.charCodeAt(0) == 13) {
        return "\\r";
    }
    if (char.charCodeAt(0) == 32) {
        return "\\s";
    }
    return char;
}
export function isAlphanumeric(character) {
    return /^[a-z0-9]+$/i.test(character);
}
export function isNumber(str) {
    if (str === null || str === "") {
        return false;
    }
    return !isNaN(str);
}
export function isAlpha(character) {
    return /^[a-zA-Z]+$/.test(character);
}
export function isWhitespace(char) {
    var whitespace = [
        String.fromCharCode(13), //carriage return
        String.fromCharCode(10), //new line
        String.fromCharCode(32), //space
        String.fromCharCode(9) //tab
    ];
    return whitespace.indexOf(char) != -1;
}
export function spliceString(str, index, count, add) {
    return str.slice(0, index) + add + str.slice(index + count);
}
export function insertString(text, index, textToInsert) {
    return text.slice(0, index) + textToInsert + text.slice(index);
}
export function printStringAsTable(str) {
    var table = [];
    for (var i = 0; i < str.length; i++) {
        table[i] = {
            char: str[i]
        };
    }
    console.table(table);
}
export function printStringAsTableHorizontal(str) {
    var table = [{}];
    for (var i = 0; i < str.length; i++) {
        table[0][i] = str[i];
    }
    console.table(table);
}
export function stringToFileUrl(text) {
    var file = new Blob([text], {
        type: 'text/plain'
    });
    return Url.createObjectURL(file);
}
export function lengthChunk(text, chunkLength) {
    var chunks = [];
    var remaining = text;
    while (remaining.length > chunkLength) {
        chunks.push(remaining.substring(0, chunkLength));
        remaining = remaining.substr(chunkLength);
    }
    chunks.push(remaining);
    return chunks;
}
export function countChunk(text, count) {
    var chunks = [];
    var chunkLength = Math.ceil(text.length / count);
    for (var i = 0; i < count; i++) {
        chunks.push(text.substring(i * chunkLength, (i + 1) * chunkLength));
    }
    return chunks;
}
export function lengthChunkWords(text, chunkLength) {
    var chunks = [];
    var words = text.split(" ");
    var currentChunk = "";
    var i = 0;
    while (i < words.length) {
        currentChunk = "";
        while (i < words.length && (currentChunk.length - 1) + words[i].length <= chunkLength) {
            currentChunk += words[i] + " ";
            i++;
        }
        if (i < words.length && words[i].length > chunkLength) {
            throw "a word was bigger than chunk length: " + chunkLength;
        }
        currentChunk = stringTrimEnd(currentChunk, 1);
        chunks.push(currentChunk);
    }
    return chunks;
}
export function truncateWords(text, length){
    var words = text.split(" ");
    var truncated = "";
    var i = 0;
    if(!length || text.length <= length){
        return text;
    }
    while(truncated.length < length && i < words.length){
        truncated += (i === 0 ? "" : " ") + words[i];
        i++;
    }
    if(truncated.length <= length && i < words.length){
        truncated += "...";
    }
    while(truncated.length > length){//overshot with ellipsis, walk back until it fits
        truncated = truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
    }
    return truncated;
}
export function htmlStringToDom(htmlString) {
    parser = new DOMParser();
    return parser.parseFromString(htmlString, "text/html");
}
export function transformToken(text, regex, replaceFunc) {
    var matches = text.match(regex);
    if (!matches) {
        return text;
    }
    for (var i = 0; i < matches.length; i++) {
        text = text.replace(matches[i], replaceFunc(matches[i]));
    }
    return text;
}
export function splitCamelCase(text) {
    return text.replace(/([A-Z])/g, ' $1').split(" ");
}
export function camelCaseToDashed(text) {
    return text.replace(/([A-Z])/g, '-$1').toLowerCase();
}
export function dashedToCamelCase(text) {
    var parts = text.split("-");
    for (var i = 0; i < parts.length; i++) {
        if (i === 0) {
            continue;
        }
        if (parts[i].length > 0) {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
        }
    }
    return parts.join("");
}
export function collapseWhitespace(text) {
    return text.replace(/\s{2,}/g, ' ');
}
export function splitWhitespace(text) {
    var split = [];
    var buffer = "";
    var quoted = false;
    var readWhitespace = false;
    for (var i = 0; i < text.length; i++) {
        if (isWhitespace(text[i]) && !quoted && !readWhitespace) {
            split.push(buffer);
            buffer = "";
            readWhitespace = true;
        } else if (isWhitespace(text[i]) && !quoted && readWhitespace) {
            continue;
        } else if (text[i] == "\"" && !quoted) {
            quoted = true;
            readWhitespace = false;
        } else if (text[i] == "\"" && quoted) {
            quoted = false;
            readWhitespace = false;
        } else {
            buffer += text[i];
            readWhitespace = false;
        }
    }
    if (buffer) {
        split.push(buffer);
    }
    return split;
}
export function templateString(text, values) {
    for (var key in values) {
        var regex = new RegExp("\\${" + key + "}", "g");
        text = text.replace(regex, values[key]);
    }
    return text;
}
export function parseLiteralList(list) {
    return list.split(/(?!\B"[^"]*),(?![^"]*"\B)/g).map(function(item) {
        var value = item.trim();
        if (isNumber(value)) {
            return parseFloat(value);
        }
        if (value === "false") {
            return false;
        }
        if (value === "true") {
            return true;
        }
        if (value === "null") {
            return null;
        }
        if (value === "undefined") {
            return undefined;
        }
        return value.replace(/\"/g, "");
    });
}
export function mixedByteArrayToString(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (typeof(value) === "string") {
            result += value;
        } else if (typeof(value) === "number") {
            result += String.fromCharCode(value);
        }
    }
    return result;
}
export const getStringInit = str =>
    str.substring(0, str.length - 1);

export function getLevenshteinDistance(stringA, stringB, memo = new Map()){
    if(!stringA){
        return stringB.length;
    }
    if(!stringB){
        return stringA.length;
    }

    const cost = stringA.charAt(stringA.length - 1) === stringB.charAt(stringB.length - 1)
        ? 0
        : 1;

    return Math.min(
        getLevenshteinDistance(getStringInit(stringA), stringB) + 1,
        getLevenshteinDistance(stringA, getStringInit(stringB)) + 1,
        getLevenshteinDistance(getStringInit(stringA), getStringInit(stringB)) + cost
    );
}

export function xsvToArray(xsv, delimiter = "\t"){
    return xsv.split("\n")
       .filter(x => x.trim() !== "")
       .map(line => line.split(delimiter)
                         .filter(v => v.trim())
                         .map(v => v.trim()));
}