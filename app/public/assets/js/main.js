const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

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
        window.location.replace(`${siteUrl}/${goto}`);
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
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("key", key);
        window.location.replace(`${siteUrl}/chats`);
      }
    );
  });

const copyElements = document.querySelectorAll(".copy");
copyElements.forEach(function (item) {
  item.addEventListener("click", function () {
    const targetField = item.dataset.target;
    const targetElement = document.getElementById(targetField);
    targetElement.select();
    targetElement.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(targetElement.value);

    item.innerText = "Copied...";
    item.classList.add("copied");
    setTimeout(function () {
      item.innerText = "Copy";
      item.classList.remove("copied");
    }, 1500);
  });
});
