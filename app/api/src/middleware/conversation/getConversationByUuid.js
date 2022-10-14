const { Conversation } = require("../../../db/mongoDb/");

const getConversationByUuid = async (req, res, next) => {
  const { uuid: _id } = req.params;
  const {
    authenticatedUser: { uuid: authedId },
  } = res;

  const conversation = await Conversation.findOne({ _id }).select({
    messages: { $slice: -3 },
  });

  const ownMessages = [];
  for (const message of conversation.messages) {
    const { sender, isReplyTo, _id, createdAt, text } = message;
    const ownText = text[authedId];

    ownMessages.push({
      _id,
      sender,
      isReplyTo,
      text: ownText,
      createdAt,
    });
  }

  const finalConversation = Object.assign(conversation, {
    messages: ownMessages,
  });

  res.Conversation = finalConversation;
  res.conversation = finalConversation;

  res.jsonData = finalConversation;
  next();
};

module.exports = getConversationByUuid;
