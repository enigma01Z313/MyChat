const { Conversation } = require("../../../db/mongoDb/");

const addMessage = async (req, res, next) => {
  const { uuid: _id } = req.params;
  const { messages, isReplyTo } = req.body;
  const {
    authenticatedUser: { uuid: sender },
    io,
    Conversation: theConversation,
  } = res;

  const conversation = await Conversation.findOneAndUpdate(
    { _id },
    {
      $push: {
        messages: {
          text: messages,
          sender,
          isReplyTo,
        },
      },
    },
    { new: true }
  ).select({ participents: 1, messages: { $slice: -1 } });

  const messageId = conversation.messages[0]._id;
  const {
    messages: newMessage,
    participents,
    _id: conversationId,
  } = conversation;
  const { text: newText, sender: messageSender } = newMessage[0];

  for (const participent of participents) {
    const { uuid } = participent;
    const encryptedMessage = newText[uuid];

    io.to(uuid).emit("newMessage", {
      encryptedMessage,
      conversationId,
      messageSender,
      title: messageSender,
      messageId
    });
  }

  return res.json(conversation);
};

module.exports = addMessage;
