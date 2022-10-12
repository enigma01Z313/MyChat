const searchIds = document.getElementById("searchIds");
const sendMessage = document.getElementById("sendMessage");

//setup default user's own data
const { id: userId, username } = JSON.parse(localStorage.getItem("userData"));
document.getElementsByTagName("h1")[0].innerText += ` "${username}"`;
document.getElementById("ownId").innerText += ` "${userId}"`;

searchIds &&
  searchIds.addEventListener("submit", async function (e) {
    e.preventDefault();
    const convesationTarget = searchIds.querySelector("[type='text']").value;

    const url = `${apiUrl}/conversations/setup/${convesationTarget}`;
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

      document
        .getElementById("chatterSection")
        .querySelector("header").innerText = `You are messaging ${data.title}`;
      localStorage.setItem("participents", JSON.stringify(data.participents));
      localStorage.setItem("conversationId", data.id);
    });
  });

sendMessage &&
  sendMessage.addEventListener("submit", async function (e) {
    e.preventDefault();

    const convesationId = localStorage.getItem("conversationId");

    const message = sendMessage.querySelector('[type="text"]').value;
    const participents = JSON.parse(localStorage.getItem("participents"));

    const messages = {};
    for (const participent of participents) {
      const pId = participent.uuid;
      const pLock = a2b64(participent.publicLock);

      const publicLock = await importedPublicKey(pLock);
      const encryptedMessage = await encryptText(message, publicLock);

      messages[pId] = b2a64(encryptedMessage);
    }

    const isReplyTo = "";
    const url = `${apiUrl}/conversations/${convesationId}`;
    const method = "POST";
    const data = { messages, isReplyTo };

    const options = {
      url,
      method,
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data,
    };

    doRequest(options, (res) => {
      // console.log(res);
      // if (user) localStorage.setItem("userData", JSON.stringify(user));
      // // console.log(user);
      // window.location.replace(`http://localhost:30000`);
    });
  });

const socket = io(siteUrl);

socket.emit("joinRoom", localStorage.getItem("accessToken"));

socket.on("logout", () => {
  console.log("implement logout user");
});

socket.on("newMessage", (data) => {
  console.log(data);
});
