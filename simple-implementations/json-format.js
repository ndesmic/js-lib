var JsonFormat = (function(){

	function format(json){
		var indentLevel = 0;
		var formattedJson = "";
		var quoted = false;
		
		for(var i = 0; i < json.length; i++){
			if((json[i] == "{" || json[i] == "[") && !quoted){
				formattedJson += json[i] + "\n";
				indentLevel++;
				formattedJson += indent(indentLevel);
			}else if((json[i] == "}" || json[i] == "]") && !quoted){
				indentLevel--;
				formattedJson += "\n" + indent(indentLevel);
				formattedJson += json[i];
			}else if(json[i] == ":" && !quoted){
				formattedJson += " : ";
			}else if(json[i] == "," && !quoted){
				formattedJson += ",\n" + indent(indentLevel);
			}else if(json[i] == "\"" && !quoted){
				quoted = true;
				formattedJson += json[i];
			}else if(json[i] == "\"" && quoted){
				quoted = false;
				formattedJson += json[i];
			}else{
				formattedJson += json[i];
			}
		}
		
		return formattedJson;
	}
	
	function indent(indentLevel){
		var indentText = "";
		for(var i = 0; i < indentLevel; i++){
			indentText += "\t";
		}
		return indentText;
	}
	
	function minify(json){
		json = json.replace(/\s*?/gm, "");
		json = json.replace(/(\r\n|\n|\r)/gm,"");
		json = json.replace(/\t/, "");
		return json;
	}
	
	function prettify(json){
		json = minify(json);
		json = format(json);
		return json;
	}

	return {
		prettify : prettify,
		minify : minify
	};

})();