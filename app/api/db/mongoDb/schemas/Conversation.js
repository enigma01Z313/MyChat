const mongoose = require("mongoose");
const MainSchema = require("./_main");

const Message = require("./Message");

const participents = {
  type: [
    {
      uuid: {
        type: String,
        required: true,
      },
      publicLock: {
        type: String,
        required: true,
      },
      unreadMessages: {
        type: Number,
        required: true,
        default: 0,
      },
      isMute: {
        type: Boolean,
        default: false,
      },
    },
  ],
  required: true,
};

const conversationSchema = new MainSchema({
  isGroup: {
    type: Boolean,
    required: true,
    default: false,
  },
  participents,
  messages: [{ type: Message }],
});

module.exports = mongoose.model("Conversation", conversationSchema);
