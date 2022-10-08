const getConversation = (req, res, next) => {
  const {
    conversation,
    user: { fullName, username },
  } = res;

  res.jsonData = {
    id: conversation.id,
    isGroup: conversation.isGroup,
    participents: conversation.participents,
    messages: conversation.messages,
    createdAt: conversation.createdAt,
    title: fullName.trim() !== "" ? fullName : username,
  };
  next();
};
module.exports = getConversation;
