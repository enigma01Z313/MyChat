const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const searchIds = document.getElementById("searchIds");
const sendMessage = document.getElementById("sendMessage");

registerForm &&
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const goto = registerForm.getAttribute("action");
    const username = registerForm.querySelector('[name="username"]').value;
    const password = registerForm.querySelector('[name="password"]').value;
    const repassword = registerForm.querySelector('[name="repassword"]').value;

    const url = `${apiUrl}/${goto}`;
    const method = "POST";
    const data = {
      username,
      password,
      repassword,
    };

    const options = {
      url,
      method,
      headers: defaultHeaders,
      data,
    };
    doRequest(
      options,
      ({ data: { accessToken, refreshToken, user, goto } }) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userData", JSON.stringify(user));
        window.location.replace(`http://localhost:30000/${goto}`);
      }
    );
  });

loginForm &&
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = loginForm.querySelector('[name="username"]').value;
    const password = loginForm.querySelector('[name="password"]').value;
    const key = loginForm.querySelector('[name="key"]').value;

    const goto = loginForm.getAttribute("action");

    const url = `${apiUrl}/${goto}`;
    const method = "POST";
    const data = {
      username,
      password,
    };

    const options = {
      url,
      method,
      headers: defaultHeaders,
      data,
    };

    doRequest(
      options,
      ({ data: { accessToken, refreshToken, user, goto } }) => {
        console.log("logged in");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("key", key);
        window.location.replace(`http://localhost:30000/chats`);
      }
    );
  });

searchIds &&
  searchIds.addEventListener("submit", async function (e) {
    e.preventDefault();
    const convesationTarget = searchIds.querySelector("[type='text']").value;

    const url = `${apiUrl}/users/${convesationTarget}`;
    const method = "GET";
    const data = {
      convesationTarget,
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

    doRequest(options, (response) => {
      const { data } = response;
      const receiver =
        data.fullName && data.fullName.trim() !== ""
          ? data.fullName
          : data.username;

      document
        .getElementById("chatterSection")
        .querySelector("header").innerText = `You are messaging ${receiver}`;
      localStorage.setItem("receiverLock", data.publicLock);
    });
  });

sendMessage &&
  sendMessage.addEventListener("submit", async function (e) {
    e.preventDefault();

    const message = sendMessage.querySelector('[type="text"]').value;
    const receiverLock = localStorage.getItem("receiverLock");

    console.log(receiverLock);
    console.log(message);
  });
