const Parser = (() => {

    class Cursor {
        constructor(iterable, index, length){
            this.index = index || 0;
            this.iterable = interable;
            this.length = length == undefined 
                ? iterable.length - this.index
                : length;
        }
        head(){
            return this.iterable[this.index];
        }
        move(distance){
            return new Cursor(this.iterable, this.index + distance, this.length - distance);
        }
    }

    class ParseResult {
        constructor(value, rest, success){
            this.value = value;
            this.rest = rest;
            this.success = success;
        }
        map(func){
            if(this.success){
                return new Success(func(this.value), this.rest, true);
            } else {
                return this;
            }
        }
        chain(func){
            if(success){
                return func(this.value, this.rest, true);
            } else {
                return this;
            }
        }
    }

    class Parser {
        //(string => ParseResult) => ()
        constructor(parseFunc){
            this.parseFunc = parseFunc;
        }
        parse(value){
            if(value instanceof Cursor){
                return this.parseFunc(value);
            } else {
                return this.parseFunc(new Cursor(value));
            }
        }
        map(func){
            return new Parser(cursor => this.parseFunc(cursor).map(func))
        }
    }



})();