const { Conversation } = require("../../../db/mongoDb/");

const getConversationByUuid = async (req, res, next) => {
  const { uuid: id } = req.params;

  const conversation = await Conversation.findOne({ id }).select({
    messages: { $slice: -3 },
  });
  res.Conversation = conversation;

  res.jsonData = conversation;
  next();
};

module.exports = getConversationByUuid;
