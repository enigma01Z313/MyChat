const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: Object,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  isReplyTo: String,
  isEditted: Boolean,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = messageSchema;
