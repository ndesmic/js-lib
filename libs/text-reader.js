const TextReader = (function() {
    function create(text) {
        var textReader = {};
        textReader.text = text;
        textReader.index = 0;
        bind(textReader);
        return textReader;
    }

    function bind(textReader) {
        textReader.setText = setText.bind(textReader);
		textReader.appendText = appendText.bind(textReader);
        textReader.readLine = readLine.bind(textReader);
        textReader.readChar = readChar.bind(textReader);
        textReader.peekChar = peekChar.bind(textReader);
		textReader.peekLine = peekLine.bind(textReader);
        textReader.validate = validate.bind(textReader);
        textReader.peekValidate = peekValidate.bind(textReader);
        textReader.readUntil = readUntil.bind(textReader);
        textReader.peekUntil = peekUntil.bind(textReader);
        textReader.readWhiteSpace = readWhiteSpace.bind(textReader);
        textReader.canReadMore = canReadMore.bind(textReader);
        textReader.readToEnd = readToEnd.bind(textReader);
        textReader.peekToEnd = peekToEnd.bind(textReader);
    }

    function setText(text) {
		this.text = text;
		this.index = 0;
		return this;
    }

	function appendText(text) {
		this.text += text;
		return this;
	}

    function readLine() {
        let char = "";
        let line = "";
        do {
            char = this.readChar();
            line += char;
        } while (char != "\n" && this.canReadMore());
        return line;
    }

    function peekLine() {
        let char = "";
        let line = "";
        do {
            char = this.readChar();
            line += char;
        } while (char != "\n" && this.canReadMore());
        return line;
    }

    function readChar() {
        let char = this.text[this.index];
        this.index++;
        return char;
    }

    function peekChar() {
        let char = this.text[this.index];
        return char;
    }

    function validate(text) {
        for (var i = 0; i < text.length; i++) {
            if (text[i] != this.text[this.index + i]) {
                return false;
            }
        }
        this.index += text.length;
        return true;
    }

    function peekValidate(text) {
        for (var i = 0; i < text.length; i++) {
            if (text[i] != this.text[this.index + i]) {
                return false;
            }
        }
        return true;
    }

    function readUntil(text) {
        let outText = "";
        while (!this.peekValidate(text)) {
            outText += this.readChar();
        }
        return outText;
    }

    function peekUntil(text) {
        let index = this.text.indexOf(text)
        if(index === -1){
            return this.peekToEnd();
        }
        return this.text.slice(this.index, index);
    }

    function readToEnd(){
        let rest = this.text.slice(this.index, this.text.lenght);
        this.index = this.text.length;
        return rest;
    }

    function peekToEnd(){
        return this.text.slice(this.index, this.text.lenght);
    }

    function readWhiteSpace() {
        let char = this.peekChar();
        let outText = "";
        while (!isWhitespace(nextChar)) {
            outText += this.readChar();
            nextChar = this.peekChar();
        }
        return outText;
    }

    function isWhitespace(char) {
        const whitespace = [
            String.fromCharCode(13), //carriage return
            String.fromCharCode(10), //new line
            String.fromCharCode(32), //space
            String.fromCharCode(9) //tab
        ];
        return whitespace.indexOf(char) != -1;
    }

    function canReadMore() {
        return this.index != this.text.length;
    }
    return {
        create: create
    };
})();
