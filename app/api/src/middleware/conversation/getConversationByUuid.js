const { Conversation } = require("../../../db/mongoDb/");

const getConversationByUuid = async (req, res, next) => {
  const { uuid: id } = req.params;

  const conversation = await Conversation.findOne({ id });
  return res.json(conversation);
};

module.exports = getConversationByUuid;
