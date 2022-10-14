class ConvesationsItems {
  constructor() {
    this.list = {};
    this.oldList = {};
    this.conversationsListElem = document.getElementById("conversationsId");
    this.activeConversation = "";
  }

  setActiveConversation(conversationId) {
    this.activeConversation = conversationId;
  }

  getActiveConversation() {
    return this.activeConversation;
  }

  getItem(conversationId) {
    const item = this.list[conversationId];
    if (item) return item;

    this.createNewConversationDomItem(conversationId);
    return {
      title: "",
      count: 0,
    };
  }

  add({ conversationId, messageSender, title, plainMessage }) {
    const item = this.getItem(conversationId);
    console.log("ConversationItems.add", item);
    const updatedItem = Object.assign(item, {
      count: item.count + 1,
      title,
    });

    this.list[conversationId] = updatedItem;

    this.render(plainMessage, messageSender);
  }

  createNewConversationDomItem(conversationId) {
    const listItem = this.list[conversationId];

    //countElement
    const count = document.createElement("div");
    const countText = document.createTextNode(listItem.count);
    count.classList.add("count");
    count.appendChild(countText);

    //conversationItemElement
    const newConversationItem = document.createElement("div");
    const titleText = document.createTextNode(listItem.title);
    newConversationItem.setAttribute("id", conversationId);
    newConversationItem.classList.add("concersationItem");

    //add convesation item data
    newConversationItem.appendChild(titleText);
    newConversationItem.appendChild(count);

    newConversationItem.addEventListener("click", getConversationData);

    //add conversationItem to list element
    this.conversationsListElem.appendChild(newConversationItem);
  }

  updateConversationDomItem(conversationId, conversationData) {
    document.getElementById(conversationId).querySelector(".count").innerText =
      conversationData.count;
  }

  createNewMessageDomItem(newMessage, messageSender) {
    const messagesElem = document.getElementById("messages");

    const messageElem = document.createElement("div");
    const messageText = document.createTextNode(newMessage);
    messageElem.classList.add("messageItem");
    if (messageSender === JSON.parse(localStorage.getItem("userData")).id)
      messageElem.classList.add("self");
    messageElem.appendChild(messageText);

    messagesElem.appendChild(messageElem);
  }

  render(plainMessage, messageSender) {
    for (const conversationId in this.list) {
      const oldItem = this.oldList[conversationId];

      if (!oldItem) this.createNewConversationDomItem(conversationId);
      else
        this.updateConversationDomItem(
          conversationId,
          this.list[conversationId]
        );

      if (conversationId === this.activeConversation)
        this.createNewMessageDomItem(plainMessage, messageSender);
    }

    this.oldList = Object.assign(this.list);
    return this.list;
  }
}
