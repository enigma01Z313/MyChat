const { Conversation } = require("../../../db/mongoDb/");

const addMessage = async (req, res, next) => {
  const { uuid: id } = req.params;
  const { messages, isReplyTo } = req.body;
  const {
    authenticatedUser: { uuid: sender },
  } = res;
  const { globalEmmiter } = res;
  globalEmmiter.emit("eventaa");

  const conversation = await Conversation.findOneAndUpdate(
    { id },
    {
      $push: {
        messages: {
          text: messages,
          sender,
          isReplyTo,
        },
      },
    }
  );

  return res.json(conversation);
};

module.exports = addMessage;
