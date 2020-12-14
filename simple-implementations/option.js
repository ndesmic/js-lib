const none = Symbol("None");

export class Option {
	hasValue;
	value;

	constructor(value){
		if(value instanceof Option){
			this.value = value.value;
			this.hasValue = value.hasValue;
		} else {
			this.value = value;
			this.hasValue = value !== none;
		}
	}
	andThen(func){
		return this.hasValue ? new Option(func(this.value)) : this;
	}
	orElse(func){
		return this.hasValue ? this : new Option(func());
	}
	filter(func){
		return (this.hasValue && func(this.value))
			? this
			: Option.none();
	}
	filterNonEmpty(){
		return this.filter(v => v && (Array.isArray(v) && v.length > 0) || (v instanceof Object && Object.keys(v).length > 0) || !(v instanceof Object));
	}
	filterTruthy(){
		return this.filter(v => v);
	}
	filterNullable(){
		return this.filter(v => v !== undefined && v !== null);
	}
	filterDefined(){
		return this.filter(v => v !== undefined);
	}
	valueOrDefault(defaultValue){
		return this.hasValue ? this.value : defaultValue
	}
	valueOfThrow(){
		if(this.hasValue){
			return this.value;
		}
		throw new Error("Cannot unwrap empty option.");
	}
	static some(value){
		return new Option(value);
	}
	static none(){
		return new Option(none);
	}
	static fromNonEmpty(value){
		return Option.some(value).filterNonEmpty();
	}
	static fromTruthy(value){
		return Option.some(value).filterTruthy();
	}
	static fromNullable(value){
		return Option.some(value).filterNullable();
	}
	static fromDefined(value){
		return Option.some(value).filterDefined();
	}
	static try(func){
		try {
			return Option.some(func());
		} catch(ex){
			return Option.none();
		}
	}
	static async tryAsync(func){
		try {
			return Option.some(await func())
		} catch(ex){
			return Option.none();
		}
	}
};
