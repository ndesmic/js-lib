const Vapid = (function(){

	async function createJwt({ algorithm, type, audience, expiration, subject, publicKey, privateKey }){
		const info = {
			typ: type || "JWT",
			alg: agorithm
		};
		const packedInfo = btoa(JSON.stringify(info));
		const data = {
			aud: audience,
			exp: expiration || Math.floor(Date.now() / 1000) + (12 * 60 * 60),
			sub: subject
		};
		const packedData = btoa(JSON.stringify(info));
		const unsignedToken = [packedInfo, packedData].join(".");

		const jwtKey = {
			kty: "EC",
			crv: "P-256",
			x: base64UrlEncode(publicKey.substring(1, 33)),
			y: base64UrlEncode(publicKey.substring(33, 65)),
			d: base64UrlEncode(privateKey.substring(33, 65))
		}

		const key = await crypto.subtle.importKey("jwk", jwtKey, { name: "ECDSA", namedCurve: "P-256"}, true, ["sign"]);
		const signature = await crypto.subtle.sign({ name: "ECDSA", hash: { name: "SHA-256" }}, key, unsignedToken);
		return [packedInfo, packedData, signature].join(".");
	}

	function getHeader(serverKey){
		return `p256ecdsa=${btoa(serverKey)}`
	}

	function base64UrlEncode(text){
		let b64 = btoa(text);
		b64 = b64.split("=")[0];
		b64 = b64.replace(/\+/g, "-");
		b64 = b64.replace(/\//g, "_");
		return b64;
	}

	function b64UrlToUint8Array(base64String) {
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/');

		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}

	return {
		createJwt,
		getHeader
	};

})();
