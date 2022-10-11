const { Conversation } = require("../../../db/mongoDb/");

const testt = async (req, res, next) => {
  const { uuid: id } = req.params;
  const conversation = await Conversation.findOneAndUpdate(
    { id },
    {
      $push: {
        messages: {
          text: { sadf: "222", sss: "333" },
          sender: "11111",
          isReqplyTo: "22222",
          isEditted: true,
          time: new Date().getTime(),
        },
      },
    }
  );

  return res.json(conversation);
};

module.exports = testt;
