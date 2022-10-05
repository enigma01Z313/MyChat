const registerForm = document.getElementById("registerForm");

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

  try {
    const {
      data: { accessToken, refreshToken, user, goto },
    } = await axios(options);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(user));

    window.location.replace(`http://localhost:30000/${goto}`);
  } catch ({
    response: {
      status,
      data: {
        error: { text },
      },
    },
  }) {
    Swal.fire({
      html: `<b style='color: red'>${status}</b> ${text}`,
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      icon: "error",
      position: "top-end",
      toast: true,
    });
  }
});
