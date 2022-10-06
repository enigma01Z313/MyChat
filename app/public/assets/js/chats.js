const { id: userId, username } = JSON.parse(localStorage.getItem("userData"));

document.getElementsByTagName("h1")[0].innerText += ` "${username}"`;
document.getElementById("ownId").innerText += ` "${userId}"`;
