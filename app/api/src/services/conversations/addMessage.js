const { Conversation } = require("../../../db/mongoDb/");

const addMessage = async (req, res, next) => {
  const { uuid: id } = req.params;
  const { messages, isReplyTo } = req.body;
  const {
    authenticatedUser: { uuid: sender },
    io,
    Conversation: theConversation,
  } = res;

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
    },
    { new: true }
  ).populate({
    path: 'messages',
    select: 'text sender',
    options: {
      sort: { createdAt: -1 },
      limit: 2
    }
  })
  // .select({ participents: 1, messages: 1 });

  console.log(conversation);

  for (const participent of conversation.participents) {
    const { uuid } = participent;
    io.to(uuid).emit("newMessage", "2222222333333");
  }

  // io.to("aaaa").emit("newMessage", "2222222333333");

  return res.json(conversation);
};

module.exports = addMessage;
