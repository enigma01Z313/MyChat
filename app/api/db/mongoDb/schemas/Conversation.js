const mongoose = require("mongoose");
const MainSchema = require("./_main");

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

const messages = {
  type: [
    {
      _id: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      isReqplyTo: String,
      isEditted: Boolean,
      time: {
        type: Date,
        required: true,
      },
    },
  ],
};

const conversationSchema = new MainSchema({
  isGroup: {
    type: Boolean,
    required: true,
    default: false,
  },
  participents,
  messages,
});

module.exports = mongoose.model("Conversation", conversationSchema);
