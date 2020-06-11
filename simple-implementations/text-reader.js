export class TextReader {
    constructor(text) {
        this.text = text;
        this.index = 0;
    }

    setText(text) {
        this.text = text;
        this.index = 0;
    }

    appendText(text) {
        this.text += text;
    }

    readLine() {
        let char = "";
        let line = "";
        do {
            char = this.readChar();
            line += char;
        } while (char != "\n" && this.canReadMore());
        return line;
    }

    peekLine() {
        let char = "";
        let line = "";
        do {
            char = this.readChar();
            line += char;
        } while (char != "\n" && this.canReadMore());
        return line;
    }

    readChar() {
        let char = this.text[this.index];
        this.index++;
        return char;
    }

    peekChar() {
        let char = this.text[this.index];
        return char;
    }

    validate(text) {
        for (var i = 0; i < text.length; i++) {
            if (text[i] != this.text[this.index + i]) {
                return false;
            }
        }
        this.index += text.length;
        return true;
    }

    peekValidate(text) {
        for (var i = 0; i < text.length; i++) {
            if (text[i] != this.text[this.index + i]) {
                return false;
            }
        }
        return true;
    }

    readUntil(...args) {
        let result = this.peekUntil(...args);
        this.index += result.result.length;
        return result;
    }

    peekUntil(...args) {
        let buffer = "";
        let i = this.index;
        while(i < this.text.length){
            var match = findMatch(this.text, i, args);
            if(match.result){
                return { result : buffer, match : match.valueMatched };
            }else{
                buffer += this.text.charAt(i);
            }
            i++;
        }
        return { result : buffer };
    }

    findMatch(text, index, stringsToMatch){
        let foundMatch = false;
        for(let i = 0; i < stringsToMatch.length; i++){
            let potentialMatch = true;
            let str = stringsToMatch[i];
            for(let j = 0; j < str.length; j++){
                if(text.charAt(index + j) != str.charAt(j)){
                    potentialMatch = false;
                    break;
                }
            }
            if(potentialMatch){
                return { result : true, valueMatched : str };
            }
        }
        return { result : false };
    }

    readToEnd() {
        let rest = this.text.slice(this.index, this.text.lenght);
        this.index = this.text.length;
        return rest;
    }

    peekToEnd() {
        return this.text.slice(this.index, this.text.lenght);
    }

    readWhiteSpace() {
        let nextChar = this.peekChar();
        let outText = "";
        while (isWhiteSpace(nextChar)) {
            outText += this.readChar();
            nextChar = this.peekChar();
        }
        return outText;
    }

    isWhiteSpace(char) {
        const whitespace = [
            String.fromCharCode(13), //carriage return
            String.fromCharCode(10), //new line
            String.fromCharCode(32), //space
            String.fromCharCode(9) //tab
        ];
        return whitespace.indexOf(char) != -1;
    }

    canReadMore() {
        return this.index != this.text.length;
    }
}
