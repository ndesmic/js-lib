/**
 * replace all occurrences of string
 * @deprecated replaced by native string.prototype.replaceAll
*/
export function replaceAll(currentString, stringToReplace, replacement) {
    return currentString.replace(new RegExp(stringToReplace, ["g"]), replacement);
}

/**
 * pads string to length with character
 * @deprecated replaced by native string.padStart
 */
export function padStart(text, length, padChar) {
    text = text.toString();
    padChar = padChar || "0";
    const lengthToPad = length - text.length;
    if (lengthToPad > 0) {
        for (let i = 0; i < lengthToPad; i++) {
            text = padChar + text;
        }
    }
    return text;
}

/**
 * pads string end to length with character
 * @deprecated replaced by native string.padEnd
 */
export function padEnd(text, length, pad) {
    text = text.toString();
    pad = pad || "0";
    const lengthToPad = length - text.length;
    if (lengthToPad > 0) {
        for (let i = 0; i < lengthToPad; i++) {
            text = text + pad;
        }
    }
    return text;
}