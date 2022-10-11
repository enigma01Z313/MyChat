const { Conversation } = require("../../../db/mongoDb/");

const getConversationByUuid = async (req, res, next) => {
  const { uuid: id } = req.params;

  const conversation = await Conversation.findOne({ id });
  res.Conversation = conversation;

  next();
};

module.exports = getConversationByUuid;
