QUnit.module(".getHeader");

QUnit.test("gets valid header", assert => {
  const jwt = "123.abc.doremi";
  const result = Vapid.getAuthorizationHeaderValue(jwt);
  assert.equal(result, `WebPush ${jwt}`);
});

QUnit.module(".getJwt");

QUnit.test("gets valid jwt info", assert => {
  const done = assert.async();
  const x = "RbrSkXYp1wVzEueU99McxQgL22t7pe0XsTOJGZPagmI"; //43 -> 32bytes
  const y = "Cn6nrYazfti-7VxHUobnMc6lOIlJu5kbYuuP76wnfKY"; //43 -> 32bytes
  const d = "14L8niuCvl7a1k6mwiwMwc55XzrOPxMvN6LcUDm1MO0"; //43 -> 32bytes
  const audience = "https://push.services.mozilla.com";
  const subject = "mailto:admin@example.com"
  const publicKey = x + y;
  const expiration = 1;

  Vapid.createJwt({
    audience,
    subject,
    publicKey,
    privateKey : d,
    expiration
  }).then(jwt => {
    const [firstPart, secondPart, thirdPart] = jwt.split(".");
    assert.equal(atob(firstPart), `{"alg":"E256","typ":"JWT"}`);
    assert.equal(atob(secondPart), `{"aud":"${audience}","exp":${expiration},"sub":"${subject}"}`);

    Vapid.verifyJwt(jwt, publicKey)
      .then(result => {
        assert.ok(result);
        done();
      });
  });
});

QUnit.module("local encrypting");

QUnit.test("it works", assert => {
  const done = assert.async();

  Vapid.getLocalEncryptionKey()
    .then(pair => {
      assert.ok(pair);
      done();
    });
});

QUnit.module("encoding");

QUnit.test("encoding works forward", assert => {
  const values = new Uint8Array([123, 65, 71, 3]);
  const result = Vapid.uint8ArrayToBase64Url(values);
  
  assert.deepEqual(Vapid.base64UrlToUint8Array(result), values);
});

QUnit.test("encoding works backward", assert => {
  [
    "Cn6nrYazfti-7VxHUobnMc6lOIlJu5kbYuuP76wnfKY",
    "RbrSkXYp1wVzEueU99McxQgL22t7pe0XsTOJGZPagmI"
  ].forEach(value => {
    const result = Vapid.base64UrlToUint8Array(value);
    assert.deepEqual(Vapid.uint8ArrayToBase64Url(result), value);
  });
});

QUnit.module("createHmac");

QUnit.test("it works", assert => {
  const done = assert.async();
  Vapid.createHmac(Vapid.stringToArrayBuffer("salty"), Vapid.stringToArrayBuffer("data123"))
    .then(res => {
      assert.equal(Vapid.uint8ArrayToBase64(res), "+QFl8lIL7kZGix3DTZ9BVYaTdlKrM+5RqDrEfbsitng=");
      done();
    });
});

QUnit.module("hkdf");

QUnit.test("it works", assert => {
  const done = assert.async();
  Vapid.hkdf(
      Vapid.stringToArrayBuffer("salty"), 
      Vapid.stringToArrayBuffer("insecurekeymaterial"), 
      Vapid.stringToArrayBuffer("data123"), 
      32
    )
    .then(res => {
      assert.equal(Vapid.uint8ArrayToBase64(res), "1ILJla66iPSMZ0YH8IZo3SyRYja0AXLCEsewWN0CBaI=");
      done();
    });
});

QUnit.module("get shared secret");

QUnit.test("it works", async assert => {
  const done = assert.async();

  const { publicKey, privateKey } = await Vapid.getLocalEncryptionKey();
  const otherPublicKeyRaw = Vapid.base64ToUint8Array("BBwW9YFG2FjCfXq3sSZE1CXLEUIgQsXu9ewNJQIJb9XtI4823NvAmVkYDwlAAvX3TJgxpQjrr5g1MgXT5ytx6Vc=");
  const otherPublicKey = await crypto.subtle.importKey("raw", otherPublicKeyRaw, { name: "ECDH", namedCurve: "P-256" }, true, []);
  const sharedSecretRaw = await Vapid.generateSharedSecret(privateKey, otherPublicKey);
  const sharedSecret = Vapid.uint8ArrayToBase64(new Uint8Array(sharedSecretRaw));

  assert.ok(sharedSecret);

  done();
});