const Dispatcher = (function(){

	function create(){
		const dispatcher = {};
		bind(dispatcher);
		dispatcher.init();
		return dispatcher;
	}

	function bind(dispatcher){
		dispatcher.init = init.bind(dispatcher);
		dispatcher.addEventListener = addEventListener.bind(dispatcher);
		dispatcher.trigger = trigger.bind(dispatcher);
		dispatcher.removeEventListener = removeEventListener.bind(dispatcher);
	}

	function addEventListener(event, callback){
		const id = this.model.id++;

		if(this.model.listeners[event]){
			this.model.listeners[event].push({
				id : id,
				callback : callback
			});
			return id;
		}else{
			this.model.listeners[event] = [{
				id : id,
				callback : callback
			}];
		}
	}

	function trigger(event, details){
		if(this.model.listeners[event]){
			this.model.listeners[event].forEach(x => x.callback(details));
		}
	}

	function removeEventListener(id){
		for(let listenerList of this.model.listeners){
			const index = listenerList.findIndex(x => x.id === id);
			listenerList.splice(index, 1);
		}
	}

	function init(){
		this.model = {
			listeners : {},
			currentId : 0
		};
	}

	return {
		create,
		globalDispatcher : create()
	};

})();
