const Tokenizer = (function(){
	
	const defaults = {
		tokenTypes : [] //required
	};
	
	function create(){
		const tokenizer = {};
		bind(tokenizer);
		return tokenizer;
	}
	
	function bind(tokenizer){
		tokenizer.getTokens = this.getTokens.bind(tokenizer);
		tokenizer.getToken = this.getToken.bind(tokenizer);
	}
	
	function* getTokens(text){
		let index = 0;

		while(index < text.length){
			let buffer = "";
			while(index < text.length && text.charAt(index) !== " "){
				buffer += text.charAt(index);
				index++;
			}
			yield this.getToken(buffer, index);
			index++;
		}
		yield new DateQueryTokens.End();
		return;
	}
	getToken(text, index){
		let date = new Date(text);
		if(!isNaN(date.getTime())){
			return new DateQueryTokens.Date(date);
		}

		throw `Unknown token ${text} at ${index - text.length}`;
	}
})();