const generateNewPairKey = async () => {
  const { publicKey, privateKey, publicKeyTxt, privateKeyTxt } =
    await generateKeyPair();

  document.getElementById("publicLock").value = publicKeyTxt;
  document.getElementById("privateKey").value = privateKeyTxt;

  // const publicKeyKey = await importedPublicKey(humanKeh.public);
  // const privateKeyKey = await importedPrivateKey(humanKeh.private);

  // const aa = "صصssسس";
  // console.log(aa);
  // console.log(b2a64(aa));
  // console.log(a2b64(b2a64(aa)));

  // console.log(humanKeh.public === a2b64(b2a64(humanKeh.public)));
  // console.log(humanKeh.private);
  // console.log(window.btoa(humanKeh.private));

  // console.log("----------------------");
  // const a = data;
  // const b = await encryptText(a, publicKey);
  // const c = await encryptText(a, publicKeyKey);

  // const d = await decryptText(b, privateKeyKey);
  // const e = await decryptText(c, privateKey);
  // console.log(a);
  // console.log(d);
  // console.log(e);
};

document.getElementById("resetPairKey").addEventListener("click", function (e) {
  e.preventDefault();
  generateNewPairKey();
});

document
  .getElementById("updatePublicLock")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    value = document.getElementById("publicLock").value;
    if (value[value.length - 1] === "\na") {
      value = value.slice(0, -1);
    }

    const user = JSON.parse(localStorage.getItem("userData"));
    const url = `${apiUrl}/users/${user.id}`;
    const method = "PUT";
    const data = {
      publicLock: value,
      status: 1,
    };

    const options = {
      url,
      method,
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data,
    };
    doRequest(options, ({ data: user }) => {
      if (user) localStorage.setItem("userData", JSON.stringify(user));
      console.log(user);
      // window.location.replace(`http://localhost:30000`);
    });
  });

(function () {
  generateNewPairKey();
})();
