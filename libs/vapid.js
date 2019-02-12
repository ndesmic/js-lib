const Vapid = (function(){

	function getAuthorizationHeaderValue(jwt){
		return `WebPush ${jwt}`;
	}

	function getCryptoKeyHeaderValue(base64PublicKey){
		return `p256ecdsa=${base64PublicKey}`;
	}

	async function createJwt({ audience, expiration, subject, publicKey, privateKey }){
		const info = {
			alg: "E256",
			typ: "JWT"
		};
		const packedInfo = btoa(JSON.stringify(info));
		const data = {
			aud: audience,
			exp: expiration || Math.floor(Date.now() / 1000) + (12 * 60 * 60),
			sub: subject
		};
		const packedData = btoa(JSON.stringify(data));
		const unsignedToken = [packedInfo, packedData].join(".");
		const unsignedTokenBuffer = stringToArrayBuffer(unsignedToken);

		const jwtKey = {
			kty: "EC",
			crv: "P-256",
			x: publicKey.slice(0,43),
			y: publicKey.slice(43,86),
			d: privateKey
		}

		const key = await crypto.subtle.importKey("jwk", jwtKey, { name: "ECDSA", namedCurve: "P-256"}, true, ["sign"]);
		const signature = await crypto.subtle.sign({ name: "ECDSA", hash: { name: "SHA-256" }}, key, unsignedTokenBuffer);
		return [packedInfo, packedData, uint8ArrayToBase64Url(new Uint8Array(signature))].join(".");
	}

	async function verifyJwt(jwt, publicKey){
		const [info, data, signature] = jwt.split(".");
		const signatureBuffer = base64UrlToUint8Array(signature);
		const dataBuffer = stringToArrayBuffer([info, data].join("."));
		const jwtKey = {
			kty: "EC",
			crv: "P-256",
			x: publicKey.slice(0,43),
			y: publicKey.slice(43,86),
			ext: true,
			key_ops: ["verify"]
		};
		const key = await crypto.subtle.importKey("jwk", jwtKey, { name: "ECDSA", namedCurve: "P-256"}, true, ["verify"]);
		return await crypto.subtle.verify({
			name: "ECDSA", 
			namedCurve: "P-256",
			hash: {name: "SHA-256" }
		}, key, signatureBuffer, dataBuffer);
	}

	async function getLocalEncryptionKey(){
		return crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
	}
	
	function getSalt(){
		let array = new Uint8Array(16);
		crypto.getRandomValues(array);
		return array;
	}

	function base64ToUint8Array(base64String){
		const rawData = window.atob(base64String);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}

	function base64UrlToUint8Array(base64String) {
		base64String = base64String.replace(/\-/g, "+");
		base64String = base64String.replace(/\_/g, "/");
		return base64ToUint8Array(base64String);
	}

	function uint8ArrayToBase64(bytes){
		let encoded = "";
		const len = bytes.byteLength;

		for (let i = 0; i < len; i++) {
			encoded += String.fromCharCode(bytes[i]);
		}

		//encoded = Array.from(bytes).map(String.fromCharCode).join("");

		return window.btoa(encoded);
	}

	function uint8ArrayToBase64Url(bytes) {
		const encoded = uint8ArrayToBase64(bytes);
		return encoded.replace(/\+/g, "-")
					.replace(/\//g, "_")
					.replace(/=/g, "");
	}

	function stringToArrayBuffer(string){
		const arrayBuffer = new ArrayBuffer(string.length);
		const uInt8Array = new Uint8Array(arrayBuffer);

		for (let i = 0; i < string.length; i++) {
			uInt8Array[i] = string.charCodeAt(i);
		}

		return arrayBuffer;
	}

	function arrayBufferToString(arrayBuffer){
		arrayBuffer = arrayBuffer.buffer ? arrayBuffer.buffer : arrayBuffer;
		const dataView = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
		let newString = "";
		for(let i = 0; i < dataView.byteLength; i++){
			newString += String.fromCharCode(dataView.getUint8(i));
		}
		return newString;
	}

	async function createHmac(keyData, data){
		const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, true, ["sign"]);
		const signed = await crypto.subtle.sign("HMAC", key, data);
		return new Uint8Array(signed);
	}

	async function hkdf(salt, insecureKeyMaterial, data, length){
		const key = await createHmac(salt, insecureKeyMaterial);
		const paddedData = Uint8Array.from([...new Uint8Array(data), 1]);

		return (await createHmac(key, paddedData)).slice(0, length);
	}

	async function generateSharedSecret(privateKey, otherPublicKey){
		return crypto.subtle.deriveBits({ name: "ECDH", namedCurve: "P-256", public: otherPublicKey }, privateKey, 256);
	}

	async function generatePseudoRandomKey(sharedSecret, privateAuthKey){
		const authEncoding = stringToArrayBuffer("Content-Encoding: auth\0");
		return hkdf(privateAuthKey, sharedSecret, authBufffer, 32);
	}

	async function generateContext(publicSubscriptionKey /*string*/, publicLocalKey /*Uint8Array*/){
		const keyLabel = stringToArrayBuffer("P-256\0");
		const publicSubscriptionKeyBytes = base64ToUint8Array(publicSubscriptionKey);
		const publicSubscriptionKeyLength = Uint8Array.of(0, publicSubscriptionKey.length);
		const publicLocalKeyLength = Uint8Array.of(0, publicLocalKey);
		return Uint8Array.from([
			...keyLabel, 
			...publicSubscriptionKeyLength,
			...publicSubscriptionKeyBytes,
			...publicLocalKeyLength,
			...publicLocalKey
		]);
	}

	async function generateNonce(context, salt, pseudoRandomKey){
		const nonceEncoding = stringToArrayBuffer("Content-Encoding: nonce\0");
		const nonceInfo = Uint8Array.from([
			...nonceEncoding,
			...context
		]);
		return await hkdf(salt, pseudoRandomKey, nonceInfo, 12);
	}

	async function generateNonce(context, salt, psuedoRandomKey){
		const cekEncoding = stringToArrayBuffer("Content-Encoding: aesgcm\0");
		const cekInfo = Uint8Array.from([
			...nonceEncoding,
			...context
		]);
		return await hkdf(salt, psuedoRandomKey, cekInfo, 16);
	}

	async function createCipher(nonce, contentEncryptionKeyRaw, payload){
		const paddingLength = 2;
		const contentEncryptionKey = await crypto.subtle.importKey("raw", contentEncryptionKeyRaw, { name: "AES-GCM" }, true, ["encrypt"]);
		const padding = new Uint8Array(2 + paddingLength);
		padding.fill(0);
		padding.set([0, paddingLength], 0); //maybe not correct

		const paddedPayload = Uint8Array.from([...padding, ...payload]);

		//and then attach auth tag, whatever that is
		return crypto.subtle.encrypt({ name: "AES-GCM", iv : nonce }, contentEncrpytionKey, paddedPayload);
	}

	return {
		createJwt,
		verifyJwt,
		uint8ArrayToBase64,
		uint8ArrayToBase64Url,
		base64ToUint8Array,
		base64UrlToUint8Array,
		getAuthorizationHeaderValue,
		getCryptoKeyHeaderValue,
		getLocalEncryptionKey,
		stringToArrayBuffer,
		createHmac,
		hkdf,
		generateSharedSecret
	};

})();
