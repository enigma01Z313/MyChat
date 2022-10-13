const { Conversation } = require("../../../db/mongoDb/");

const getConversationByUuid = async (req, res, next) => {
  const { uuid: _id } = req.params;

  const conversation = await Conversation.findOne({ _id }).select({
    messages: { $slice: -3 },
  });

  console.log(conversation);

  res.Conversation = conversation;

  res.jsonData = conversation;
  next();
};

module.exports = getConversationByUuid;
