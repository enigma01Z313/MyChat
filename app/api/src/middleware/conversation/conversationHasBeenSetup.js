const { Conversation } = require("../../../db/mongoDb/");

const conversationHasBeenSetup = async (req, res, next) => {
  const participents = [res.authenticatedUser.uuid, req.params.userId];

  const conversation = await Conversation.find({
    $and: participents.map((item) => ({ "participents.uuid": item })),
  });

  if (conversation.length === 0) return next();

  res.conversation = conversation[0];
  return next();
};

module.exports = conversationHasBeenSetup;
