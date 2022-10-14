class ChatsStore {
  constructor() {
    this.messagesList = new Map();
    this.conversationsList = new Map();
    this.conversationsListElem = document.getElementById("conversationsId");
    this.messagesElem = document.getElementById("messages");
    this.activeConversation = this.resetActiveConversation();
  }

  resetActiveConversation() {
    this.activeConversation = {
      title: "",
      id: "",
      messages: new Map(),
    };
  }

  setActiveConversation(conversationId) {
    this.activeConversation.id = conversationId;
  }

  getActiveConversation() {
    return this.activeConversation;
  }

  //conversaion item interactions
  conversationExits(conversationId) {
    return this.conversationsList.get(conversationId) ? true : false;
  }

  addNewConversationItem(conversationId, conversationData) {
    const newItem = Object.assign(
      {
        title: "",
        count: 0,
      },
      conversationData
    );

    this.conversationsList.set(conversationId, newItem);

    return this.conversationsList;
  }

  getConversationItem(conversationId) {
    const conversationItem = this.conversationsList.get(conversationId);

    return conversationItem;
  }

  //message item interactions
  messageExits(messageId) {
    return this.messagesList.get(messageId) ? true : false;
  }

  addNewMessageItem(messageId, messageData) {
    const newItem = Object.assign(
      {
        text: "",
        isReplyTo: "",
        date: 0,
        sender: "",
      },
      messageData
    );

    this.activeConversation.messages.set(messageId, newItem);

    return this.activeConversation.messages;
  }

  getMessageItem(messageId) {
    // if (!this.messageExits(messageId)) this.addNewMessageItem(messageId);

    return this.messagesList.get(messageId);
  }

  //requests
  reqUserName = (uuid) =>
    new Promise(async (res, rej) => {
      const url = `${apiUrl}/users/${uuid}`;
      const method = "GET";
      const data = {};
      const options = {
        url,
        method,
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data,
      };

      await doRequest(options, async ({ data }) => {
        const title =
          data.fullName.trim() !== "" ? data.fullName : data.username;
        res(title);
      });
    });

  reqConversationsData() {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    const url = `${apiUrl}/users/${userId}/conversations`;
    const method = "GET";
    const data = {};
    const options = {
      url,
      method,
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data,
    };

    doRequest(options, async ({ data }) => {
      for (const {
        _id: conversaionId,
        participents,
        title: conversationTitle,
      } of data) {
        const count = participents.find(
          (item) => item.uuid === userId
        ).unreadMessages;

        const title =
          conversationTitle ??
          (await this.reqUserName(
            participents.find((item) => item.uuid !== userId).uuid
          ));

        this.addNewConversationItem(conversaionId, { count, title });
        this.renderConversationList();
      }
    });
  }

  reqConversationData(thisInstance) {
    return function (e) {
      const targetConversationId = e.target.classList.contains(
        "conversationItem"
      )
        ? e.target.id
        : e.target.parentElement.id;

      const url = `${apiUrl}/conversations/${targetConversationId}`;
      const method = "GET";
      const data = {};
      const options = {
        url,
        method,
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data,
      };

      doRequest(options, async ({ data }) => {
        const privateKey = await importedPrivateKey(
          a2b64(localStorage.getItem("key"))
        );

        thisInstance.resetActiveConversation();
        thisInstance.setActiveConversation(data.id);
        for (const message of data.messages) {
          const { isReplyTo, updatedAt: date, text, sender } = message;
          const encryptedText = a2b64(text);
          const plainMessage = await decryptText(encryptedText, privateKey);

          thisInstance.addNewMessageItem(message._id, {
            text: plainMessage,
            isReplyTo,
            date,
            sender,
          });
        }

        thisInstance.renderMessageList();
      });
    };
  }

  searchConversation(url) {
    const method = "GET";
    const data = {};
    const options = {
      url,
      method,
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data,
    };

    doRequest(options, async (response) => {
      const { data } = response;

      const privateKey = await importedPrivateKey(
        a2b64(localStorage.getItem("key"))
      );

      this.resetActiveConversation();
      this.setActiveConversation(data.id);
      for (const message of data.messages) {
        console.log(message);
        const { isReplyTo, updatedAt: date, text, sender } = message;
        const encryptedText = a2b64(text);
        const plainMessage = await decryptText(encryptedText, privateKey);

        this.addNewMessageItem(message._id, {
          text: plainMessage,
          isReplyTo,
          date,
          sender,
        });
      }

      this.renderMessageList();
    });
  }

  //dom manupilations
  renderConversationList() {
    //empty conversation list
    this.conversationsListElem.innerHTML = "";

    //fill conversation list with conversation items
    for (const [conversationId, conversationItem] of this.conversationsList) {
      //count element
      const countText = document.createTextNode(conversationItem.count);
      const count = document.createElement("span");
      count.classList.add("count");
      count.appendChild(countText);

      //title element
      const titleText = document.createTextNode(conversationItem.title);
      const titleElement = document.createElement("span");
      titleElement.classList.add("title");
      titleElement.appendChild(titleText);

      //conversationItemElement
      const newConversationItem = document.createElement("div");
      newConversationItem.setAttribute("id", conversationId);
      newConversationItem.classList.add("conversationItem");
      newConversationItem.addEventListener(
        "click",
        this.reqConversationData(this)
      );

      //add convesation item data
      newConversationItem.appendChild(titleElement);
      newConversationItem.appendChild(count);

      //add conversationItem to list element
      this.conversationsListElem.appendChild(newConversationItem);
    }
  }

  renderMessageList() {
    //empty message list
    this.messagesElem.innerHTML = "";

    //fill message list with message items
    for (const [messageId, messageItem] of this.getActiveConversation()
      .messages) {

      //configure message element and it's classes
      const messageElem = document.createElement("div");
      messageElem.id = messageId;
      messageElem.classList.add("messageItem");
      if (
        messageItem.sender === JSON.parse(localStorage.getItem("userData")).id
      )
        messageElem.classList.add("self");
      const messageText = document.createTextNode(messageItem.text);

      //add message text to message element
      messageElem.appendChild(messageText);

      //add message element to messages section
      this.messagesElem.appendChild(messageElem);
    }
  }
}
