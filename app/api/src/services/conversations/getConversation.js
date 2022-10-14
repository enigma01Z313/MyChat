const getConversation = (req, res, next) => {
  const { conversation, user, conversationTitle } = res;
  const { fullName, username } = user ?? {};

  const title = conversationTitle
    ? conversationTitle
    : fullName.trim() !== ""
    ? fullName
    : username;

  res.jsonData = {
    id: conversation.id,
    isGroup: conversation.isGroup,
    participents: conversation.participents,
    messages: conversation.messages,
    createdAt: conversation.createdAt,
    title,
  };

  next();
};
module.exports = getConversation;
