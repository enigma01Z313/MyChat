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

      console.log(data);

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

    const message = sendMessage.querySelector('[type="text"]').value;
    const participents = JSON.parse(
      localStorage.getItem("participents")
    ).filter((item) => item.uuid !== userId);

    const messages = [];
    for (const participent of participents) {
      const pId = participent.uuid;
      const pLock = participent.publicLock;
      const encryptedMessage = 1 + pLock;

      messages[pId] = encryptedMessage;
    }

    console.log(participents);
    console.log(message);
  });

const socket = io(siteUrl);
