const IdbStorage = (function(){

  const defaults = {
    name : "idb-storage",
    siloName : "db-cache"
  };

  function create(options){
    let idbStorage = {};
    idbStorage.options = Object.assign({}, defaults, options);
    bind(idbStorage);
    idbStorage.init();
    return idbStorage;
  }

  function bind(idbStorage){
    idbStorage.init = init.bind(idbStorage);
    idbStorage.get = get.bind(idbStorage);
    idbStorage.get = get.bind(idbStorage);
    idbStorage.getAll = getAll.bind(idbStorage);
    idbStorage.set = set.bind(idbStorage);
    idbStorage.openIndexDb = openIndexDb.bind(idbStorage);
  }

  function init(){
    this.idbPromise = this.openIndexDb();
  }

  function get(key){
    return new Promise((resolve, reject) => {
      this.idbPromise
        .then(idb => {
          const transaction = this.idb.transaction(this.options.siloName, "readonly");
          const store = transaction.objectStore(this.options.siloName);
          const request = store.get(key);
          request.onerror = () => reject(request.error);
          request.onsuccess = e => resolve(e.target.result);
        });
    });
  }

  function getAll(){
    return new Promise((resolve, reject) => {
      this.idbPromise
        .then(idb => {
          const transaction = idb.transaction(this.options.siloName, "readonly");
          const store = transaction.objectStore(this.options.siloName);
          const request = store.getAll();
          request.onerror = () => reject(request.error);
          request.onsuccess = e => resolve(e.target.result);
        });
    });
  }
  
  function getAll(){
    return new Promise((resolve, reject) => {
      this.idbPromise
        .then(idb => {
          const transaction = idb.transaction(this.options.siloName, "readonly");
          const store = transaction.objectStore(this.options.siloName);
          const request = store.get();
          request.onerror = () => reject(request.error);
          request.onsuccess = e => resolve(e.target.result);
        });
    });
  }

  function set(key, value){
    return new Promise((resolve, reject) => {
      this.idbPromise
        .then(idb => {
          const transaction = idb.transaction(this.options.siloName, "readwrite");
          const store = transaction.objectStore(this.options.siloName);
          const request = store.put(value, key);
          request.onerror = () => reject(request.error);
          request.onsuccess = e => resolve(e.target.result);
        });
    });
  }

  function openIndexDb(){
    return new Promise((resolve, reject) => {
      let openRequest = indexedDB.open(this.options.name, 1);
      openRequest.onerror = () => reject(openRequest.error);
      openRequest.onupgradeneeded = e => {
        if (!e.target.result.objectStoreNames.contains(this.options.siloName)) {
          e.target.result.createObjectStore(this.options.siloName);
        }
      };
      openRequest.onsuccess = () => resolve(openRequest.result);
    });
  }

  return {
    create
  };

})();