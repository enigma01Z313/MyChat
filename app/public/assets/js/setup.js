//username
function updateKeyGenAddr(e) {
  let sshAddress = "C:\\Users\\{%username%}/.ssh/MyChat/id_rsa";
  const value = e.target.value;

  if (value.trim() !== "") {
    sshAddress = sshAddress.replace("{%username%}", value.trim());
  }

  document.getElementById("sshKeyPath").value = sshAddress;
  document.getElementById("keygenAddr").value = sshAddress;
}
document.getElementById("username").addEventListener("keyup", updateKeyGenAddr);

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
      window.location.replace(`http://localhost:30000`);
    });
  });
