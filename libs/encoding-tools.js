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

export function htmlDecode(text){
  return text.replace(/&(.*?);/g, match => {
    match = match.substr(1).slice(0, -1);
    switch(match){
      case "lt" : return "<";
      case "gt" : return ">";
      case "mdash": return "—";
      case "ndash": return "–";
      case "amp": return "&";
      default: {
        if(match.startsWith("#x")){
          return String.fromCharCode(parseInt(match.substr(2), 16));
        } else if (match.startsWith("#")){  
          return String.fromCharCode(parseInt(match.substr(1),10));
        } else {
          throw new Error("Unknown HTML entity");
        }
      }
    }
  });
}