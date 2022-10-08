const { Conversation } = require("../../../db/mongoDb/");

const createConversation =
  (isGroup = false) =>
  async (req, res, next) => {
    const {
      conversation,
      user: {
        fullName: targetName,
        username: targetUser,
        uuid: targetId,
        publicLock: targetPublic,
      },
    } = res;

    if (conversation) return next();

    const participents = [
      {
        uuid: res.authenticatedUser.uuid,
        publicLock: res.authenticatedUser.publicLock,
      },
      { uuid: targetId, publicLock: targetPublic },
    ];

    const title = isGroup
      ? req?.body?.title ?? "test"
      : targetName.trim() !== ""
      ? targetName
      : targetUser;

    const nconversation = new Conversation({
      title,
      isGroup,
      participents,
    });
    const newConversation = await nconversation.save();

    res.conversation = newConversation;
    next();
  };
module.exports = createConversation;
