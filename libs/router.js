const Router = (function(){

	const defaults = {
		routes : null, //required
		onNotFound : _=>{}
	};

	function create(options){
		const router = {};
		bind(router);
		router.init();
		return router;
	}
	
	function bind(router){
		router.attachEvents = attachEvents.bind(this);
		router.onHashChange = onHashChange.bind(this);
	}
	
	function attachEvents(){
		window.addEventListener("hashchange", this.onHashChange);
	}
	
	function onHashChange(e){
		const newUrl = new URL(e.newUrl);
		const oldUrl = new URL(e.oldUrl);
		const hash = newUrl.hash;
		const handler = this.options.router[hash];
		if(handler){
			handler(newUrl, oldUrl);
		}else{
			this.options.onNotFound(newUrl, oldUrl);
		}
	}
	
	return {
		create
	};
	
})();