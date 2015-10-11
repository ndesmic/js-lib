var TextReader = (function(){
  function create(text){
    var textReader = {};
    textReader.text = text;
    textReader.index = 0;
    bind(textReader);
    return textReader;
  }
  function bind(textReader){
    textReader.readLine = readLine.bind(textReader);
    textReader.readChar = readChar.bind(textReader);
    textReader.peekChar = peekChar.bind(textReader);
    textReader.validate = validate.bind(textReader);
    textReader.peekValidate = peekValidate.bind(textReader);
    textReader.readUntil = readUntil.bind(textReader);
    textReader.readWhiteSpace = readWhiteSpace.bind(textReader);
    textReader.canReadMore = canReadMore.bind(textReader);
  }
  function readLine(){
    var char = "";
    var line = "";
    do {
      char = this.readChar();
      line += char;
    } while(char != "\n" && this.canReadMore());
    return line;
  }
  function peekLine(){
    var char = "";
    var line = "";
    do {
      char = this.readChar();
      line += char;
    } while(char != "\n" && this.canReadMore());
    return line;
  }
  function readChar(){
    var char = this.text[this.index];
    this.index++;
    return char;
  }
  function peekChar(){
    var char = this.text[this.index];
    return char;
  }
  function validate(text){
    for(var i = 0; i < text.length; i++){
      if(text[i] != this.readChar()){
        return false;
      }
    }
    return true;
  }
  function peekValidate(text){
    for(var i = 0; i < text.length; i++){
      if(text[i] != this.text[this.index + i]){
        return false;
      }
    }
    return true;
  }
  function readUntil(text){
    var outText = "";
    while(!this.peekValidate(text)){
      outText += readChar();
    }
    return outText;
  }
  function readWhiteSpace(){
    var char = this.peekChar();
    var outText = "";
    while(!isWhitespace(nextChar)){
      outText += this.readChar();
      nextChar = this.peekChar();
    }
    return outText;
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
  function canReadMore(){
    return this.index != this.text.length;
  }
  return {
    create : create
  };
})();