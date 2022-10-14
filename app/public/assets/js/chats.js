const chatsStore = new ChatsStore();

const searchIds = document.getElementById("searchIds");
const sendMessage = document.getElementById("sendMessage");

chatsStore.reqConversationsData();
chatsStore.renderConversationList();

//setup default user's own data
const { id: userId, username } = JSON.parse(localStorage.getItem("userData"));
document.getElementsByTagName("h1")[0].innerText += ` "${username}"`;
// console.log(userId);
document.getElementById("ownId").value = userId;

searchIds &&
  searchIds.addEventListener("submit", async function (e) {
    e.preventDefault();
    const convesationTarget = searchIds.querySelector("[type='text']").value;
    const url = `${apiUrl}/conversations/setup/${convesationTarget}`;

    chatsStore.searchConversation(url);
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
      sendMessage.querySelector('[type="text"]').value = "";
      sendMessage.querySelector('[type="text"]').focus();
      // console.log(res);
      // if (user) localStorage.setItem("userData", JSON.stringify(user));
      // // console.log(user);
      // window.location.replace(`${siteUrl}`);
    });
  });

///////////////////////////////
///////////////////////////////
//socketss
///////////////////////////////
///////////////////////////////
const socket = io(siteUrl);

socket.emit("joinRoom", localStorage.getItem("accessToken"));

socket.on("logout", () => {
  console.log("implement logout user");
});

socket.on(
  "newMessage",
  async ({
    encryptedMessage,
    conversationId,
    messageSender,
    title,
    messageId,
  }) => {
    const encryptedText = a2b64(encryptedMessage);
    const privateKey = await importedPrivateKey(
      a2b64(localStorage.getItem("key"))
    );
    const plainMessage = await decryptText(encryptedText, privateKey);

    chatsStore.addNewMessageItem(messageId, {
      text: plainMessage,
      sender: messageSender,
    });

    chatsStore.renderMessageList();
  }
);
