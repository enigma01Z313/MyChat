const { Conversation } = require("../../../db/mongoDb/");

const fError = require("../../utils/fError");

const getConversations = async (req, res, next) => {
  const { theSameUser, authenticatedUser } = res;

  if (!theSameUser) next(fError(401, "Access Denied", "عدم دسترسی"));

  const conversations = await Conversation.find({
    "participents.uuid": "168daeed-c837-4616-8a1c-9d6ec492c674",
  }).select("createdAt updatedAt isGroup participents");
  // console.log(conversations);
  // return res.end("getting user's converations");

  res.jsonData = conversations;
  next();
};

module.exports = getConversations;
