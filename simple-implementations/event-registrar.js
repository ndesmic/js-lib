const EventRegistrar = (function(){

	//requires MapTools

	function create(){
		let eventRegistrar = {};
		bind(eventRegistrar);
		eventRegistrar.init();
		return eventRegistrar;
	}
	
	function bind(){
		this.on = on.bind(eventRegistrar);
		this.off = off.bind(eventRegistrar);
		this.init = init.bind(eventRegistrar);
	}
	
	function on(element, event, handler) {
		const eventId = element.addEventListener(event, handler);
		MapTools.setToMapTree(this.eventMap, [element, event, handler, eventId]);
	}
	
	function off(element, event, handler){
		const eventId = MapTools.getFromMapTree(this.eventMap, [element, event, handler]);
		if(eventId){
			element.removeEventListener(eventId);
		}
	}
	
	function init(){
		this.eventMap = new Map();
	}
	
	return {
		create
	};
})();