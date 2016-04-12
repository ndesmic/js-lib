let StringTemplater = (function(){
  
  const defaults = {
    withValues : null,
    withTemplate : null,
    tagsStartWith : "",
    tagsEndWith : ""
  };
  
  function create(options){
    var stringTemplater = {};
    stringTemplater.options = Object.assign({}, defaults, options);
    bind(stringTemplater);
    return stringTemplater;
  }
  
  function bind(stringTemplater){
    stringTemplater.withValues = withValues.bind(stringTemplater);
    stringTemplater.withTemplate = withTemplate.bind(stringTemplater);
    stringTemplater.tagsStartWith = tagsStartWith.bind(stringTemplater);
    stringTemplater.tagsEndWith = tagsEndWith.bind(stringTemplater);
    stringTemplater.template = template.bind(stringTemplater);
  }
  
  function withValues(values){
    this.options.withValues = values;
    return this;
  }
  
  function withTemplate(values){
    this.options.withValues = values;
    return this;
  }
  
  function tagsStartWith(value){
    this.options.tagsStartWith = value;
    return this;
  }
  
  function tagsEndWith(value){
    this.options.tagsEndWith = value;
    return this;
  }
  
  function template(text, values){
    if(!text){
      text = this.options.withTemplate;
    }
    if(!values){
      values = this.options.withValues;
    }
    
    
  }
  
  return {
    create : create
  };
  
})();