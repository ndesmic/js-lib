var ColorTools = (function(){

  	function hexToRgba(hex){
  		hex = hex.substr(1); //remove #
  		
  		var red = parseInt(hex.substring(0, 2), 16);
  		var green = parseInt(hex.substring(2, 4), 16);
  		var blue = parseInt(hex.substring(4, 6), 16);
  		var alpha = parseInt(hex.substring(6, 8), 16);
  		
  		return {
  			red : red,
  			green : green,
  			blue : blue,
  			alpha : alpha
  		};
	  }
	  
	  function rgbaToHex(rgba){
		  var red = StringTools.pad(parseInt(rgba.red).toString(16), 2);
		  var green = StringTools.pad(parseInt(rgba.green).toString(16), 2);
		  var blue = StringTools.pad(parseInt(rgba.blue).toString(16), 2);
		  var alpha = rgba.alpha ? StringTools.pad(parseInt(rgba.alpha).toString(16), 2) : "";
		
		  return  "#" + red + green + blue + alpha;
	  }
	  
	  function rgbaToString(rgba){
  		var out = "rgba(";
  		out += rgba.red + ",";
  		out += rgba.green + ",";
  		out += rgba.blue;
  		if(rgba.alpha){
  			out += "," + rgba.alpha;
  		}else{
  			out += ",1";
  		}
  		out += ")";
  		
  		return out;
	  }
	  
	  function colorFromOpacityResult(result, base, opacity){
		  var red = (result.red - (opacity * base.red)) / (1 - opacity);
		  var green = (result.green - (opacity * base.green)) / (1 - opacity);
		  var blue = (result.blue - (opacity * base.blue)) / (1 - opacity);
		
		  return {
			  red : red,
			  green : green,
			  blue : blue,
			  alpha : opacity
		  };
	  }
	  
	  return {
	    hexToRgba : hexToRgba
	  };

});