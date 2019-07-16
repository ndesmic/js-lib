export function findNonUtf8(text) {
  const nonUtf = [];
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode > 255) {
      nonUtf.push({
        charCode: charCode,
        index: i,
        char: text[i]
      });
    }
  }
  return nonUtf;
}
export function htmlEncode(text) {
  let encodedText = text;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode > 255) {
      encodedText = encodedText.replaceAll(text[i], "&#" + charCode + ";");
    }
  }
  return encodedText;
}