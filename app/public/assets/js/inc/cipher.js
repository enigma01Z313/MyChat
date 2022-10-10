async function createKeyPair() {
  return await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), // 24 bit representation of 65537
      hash: { name: "SHA-256" },
    },
    true, // can extract it later if we want
    ["encrypt", "decrypt"]
  );
}

const encryptText = async (text, publicKey) => {
  const dataBuffer = str2ab(text);

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    dataBuffer
  );

  return ab2str(encryptedBuffer);
};

const decryptText = async (cipher, privateKey) => {
  const cipherBuffer = str2ab(cipher);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    cipherBuffer
  );

  return ab2str(decryptedBuffer);
};

const generateKeyPair = async () => {
  let publicKey, privateKey, publicKeyTxt, privateKeyTxt;
  while (true) {
    const keyPair = await createKeyPair();
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;

    publicKeyTxt = await window.crypto.subtle.exportKey("spki", publicKey);
    privateKeyTxt = await window.crypto.subtle.exportKey("pkcs8", privateKey);

    publicKeyTxt = publicKeyTxt;
    privateKeyTxt = privateKeyTxt;

    if (isEven(publicKeyTxt.byteLength) && isEven(privateKeyTxt.byteLength))
      break;
  }

  publicKeyTxt = b2a64(ab2str(publicKeyTxt));
  privateKeyTxt = b2a64(ab2str(privateKeyTxt));
  return { publicKey, privateKey, publicKeyTxt, privateKeyTxt };
};

const importedPublicKey = async (publicKeyTxt) =>
  await window.crypto.subtle.importKey(
    "spki",
    str2ab(publicKeyTxt),
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), // 24 bit representation of 65537
      hash: { name: "SHA-256" },
    },
    true,
    ["encrypt"]
  );

const importedPrivateKey = async (privateKeyTxt) =>
  await window.crypto.subtle.importKey(
    "pkcs8",
    str2ab(privateKeyTxt),
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), // 24 bit representation of 65537
      hash: { name: "SHA-256" },
    },
    true,
    ["decrypt"]
  );
