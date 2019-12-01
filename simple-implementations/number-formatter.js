var NumberFormatter = (function(){
  function create(){
    var numberFormatter = {};
    bind(numberFormatter);
    numberFormatter.init();
    return numberFormatter;
  }
  function bind(numberFormatter){
    numberFormatter.init = init.bind(numberFormatter);
    numberFormatter.prefix = prefix.bind(numberFormatter);
    numberFormatter.suffix = suffix.bind(numberFormatter);
    numberFormatter.round = round.bind(numberFormatter);
    numberFormatter.showSign = showSign.bind(numberFormatter);
    numberFormatter.decimals = decimals.bind(numberFormatter);
    numberFormatter.format = format.bind(numberFormatter);
  }
  function init(){
    this.options = {
      prefix : "",
      suffix : "",
      round : function(){},
      showSign : false,
      decimals : null
    };
  }
  function prefix(text){
    this.options.prefix = text;
    return this;
  }
  function suffix(text){
    this.options.suffix = text;
    return this;
  }
  function round(roundFunc){
    this.options.round = roundFunc;
    return this;
  }
  function decimals(decimalPlaces){
    this.options.decimals = decimalPlaces;
    return this;
  }
  function showSign(shouldShowSign){
    this.showSign = shouldShowSign === false ? false : true;
    return this;
  }
  function format(value){
    value = this.options.round(value);
    if(this.options.decimals){
      value = value.toFixed(this.options.decimals);
    }
    
    var textValue = prefix + value + suffix;
    if(this.options.showSign && value > 0){
      textValue = "+" + textValue;
    }
    
    return textValue;
  }
  
});