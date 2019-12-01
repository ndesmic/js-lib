const none = Symbol();

export class Option {
	hasValue;
	value;

	constructor(value){
		this.value = value;
		if(value !== none){
			this.hasValue = true;
		}
	}
	static of(value){
		return new Option(value);
	}
	static none(){
		return new Option(none);
	}
};
