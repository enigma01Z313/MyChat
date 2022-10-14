const { User } = require("../../../db/mysql/models");

const getConversationTitle = async (req, res, next) => {
  const {
    conversation,
    authenticatedUser: { uuid },
  } = res;

  let conversationTitle;
  if (conversation.isGroup) {
    conversationTitle = conversation.title;
  } else {
    const targetId = conversation.participents.find(
      (item) => item.uuid !== uuid
    );
    const user = await User.findOne({ where: { uuid: targetId.uuid } });
    conversationTitle =
      user.fullName?.trim() !== "" ? user.fullName : user.username;
  }
  res.conversationTitle = conversationTitle;

  next();
};

module.exports = getConversationTitle;
