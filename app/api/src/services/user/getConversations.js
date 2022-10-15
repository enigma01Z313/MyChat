const { Conversation } = require("../../../db/mongoDb/");

const fError = require("../../utils/fError");

const getConversations = async (req, res, next) => {
  const { theSameUser, authenticatedUser } = res;

  if (!theSameUser) next(fError(401, "Access Denied", "عدم دسترسی"));

  const conversations = await Conversation.find({
    "participents.uuid": authenticatedUser.uuid,
  }).select("createdAt updatedAt isGroup participents");
  console.log(conversations[0].participents);
  // return res.end("getting user's converations");

  res.jsonData = conversations;
  next();
};

module.exports = getConversations;
