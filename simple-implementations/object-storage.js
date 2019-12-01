var ObjectStorage = (function () {
  function exists(key) {
    return localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== null;
  }
  function get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  function set(key, data) {
    try{
		    localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
		    if (e == QUOTA_EXCEEDED_ERR) {
          console.log("Local Storage Quota Exceeded");
			  }
		}
	}
  function remove(key) {
    localStorage.removeItem(key);
  }
	function clear(){
		localeStorage.clear();
	}
  return {
    exists: exists,
    get: get,
    set: set,
    remove: remove,
		clear: clear
  };
})();