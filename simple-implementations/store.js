const Store = (function(){
	const INIT = Symbol("INIT");

	function create(reducer){
		const store = {
			store: {},
			reducer,
			subscribers: new Set()
		};
		bind(store);
		store.dispatch({ type : INIT });
		return store;
	}

	function bind(store){
		store.dispatch = dispatch.bind(store);
		store.get = get.bind(store);
		store.subscribe = subscribe.bind(store);
		store.unsubscribe = unsubscribe.bind(store);
	}

	function dispatch(event){
		this.state = this.reducer(this.get(), event);
		this.subscribers.forEach(s => s(this.state));
	}

	function get(){
		return this.state;
	}

	function subscribe(func){
		this.subscribers.add(func);
	}

	function unsubscribe(func){
		this.subscribers.delete(func);
	}

	return {
		create
	};

})();
