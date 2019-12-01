var OauthTools = (function(){
  
  function getOauthTimestamp(){
		return Math.floor(new Date().getTime() / 1000);
	}
  
  function getNonce(){
		return 'Q' + getOauthTimestamp() + "ZZ";
	}
	
	function getKey(consumerSecret, tokenSecret){
		var encodedConsumerSecret = consumerSecret ? encodeURIComponent(consumerSecret) : "";
		var encodedTokenSecret = tokenSecret ? encodeURIComponent(tokenSecret) : "";
		
		return encodedConsumerSecret + "&" + encodedTokenSecret;
	}
	
	function objectToQueryString(obj){
		var queryArray = [];
		for(var key in obj){
			queryArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
		}
		
		queryArray = queryArray.sort();
		
		return queryArray.join("&");
	}
	
	function getSignature(baseString, key){
		var signatureHashBytes = Crypto.HMAC(Crypto.SHA1, baseString, key, { asBytes: true });
		var signatureHashString = byteArrayToString(signatureHashBytes);
		var signature = btoa(signatureHashString);
		
		return signature;
	}
	
	function byteArrayToString(array){
		var str = "";
		for(var i = 0; i < array.length; i++){
			str += String.fromCharCode(array[i]);
		}
		return str;
	}
  
  function getBaseString(httpMethod, url, requestParameters){
    httpMethod = encodeURIComponent(httpMethod.toUpperCase());
    url = encodeURIComponent(url);
    parameterString = encodeURIComponent(objectToQueryString(requestParameters));
    
    return `${httpMethod}&${url}&${parameterString}`;
  }
  
  return {
    getOauthTimestamp : getOauthTimestamp,
    getNonce : getNonce,
    getKey : getKey,
    objectToQueryString : objectToQueryString,
    getBaseString : getBaseString,
    getSignature : getSignature
  };
  
})();