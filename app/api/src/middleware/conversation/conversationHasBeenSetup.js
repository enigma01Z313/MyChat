const { Conversation } = require("../../../db/mongoDb/");

const conversationHasBeenSetup = async (req, res, next) => {
  const participents = [res.authenticatedUser.uuid, req.params.userId];

  // await Conversation.remove({ _id: "634093357cd24dd6d1b527de" });
  // const conversations = await Conversation.find();
  // return res.json(conversations);

  const conversation = await Conversation.find({
    $and: participents.map((item) => ({ "participents.uuid": item })),
  });

  if (conversation.length === 0) return next();

  res.conversation = conversation[0];
  return next();
};

module.exports = conversationHasBeenSetup;
