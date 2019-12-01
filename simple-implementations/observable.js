const Observable = (function(){
	function create(){
		const observable = {};
		bind(observable);
		observable.init();
		return observable;
	}
	function bind(observable){
		observable.next = next.bind(observable);
		observable.filter = filter.bind(observable);
		observable.map = map.bind(observable);
		observable.subscribe = subscribe.bind(observable);
		observable.init = init.bind(observable);
	}
	function next(value){
		this.subscribers.forEach(x => x(value));
	}
	function subscribe(func){
		this.subscribers.push(func);
		return this;
	}
	function filter(filterFunc){
		const observable = create();
		this.subscribe(value => {
			if(filterFunc(value)){
				observable.next(value);
			}
		});
		return observable;
	}
	function map(mapFunc){
		const observable = create();
		this.subscribe(value => {
			observable.next(mapFunc(value));
		});
		return observable;
	}
	function init(){
		this.subscribers = [];
	}
	return {
		create
	};
})();
