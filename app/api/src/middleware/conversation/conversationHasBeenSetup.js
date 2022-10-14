const { Conversation } = require("../../../db/mongoDb/");

const conversationHasBeenSetup = async (req, res, next) => {
  const {
    authenticatedUser: { uuid: authedId },
  } = res;
  const participents = [authedId, req.params.userId];

  const conversation = await Conversation.findOne({
    $and: participents.map((item) => ({ "participents.uuid": item })),
  }).select({
    messages: { $slice: -3 },
  });

  if (!conversation) return next();

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

  res.conversation = finalConversation;
  return next();
};

module.exports = conversationHasBeenSetup;
