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


