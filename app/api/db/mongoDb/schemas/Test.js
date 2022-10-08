const mongoose = require("mongoose");
const MainSchema = require("./_main");

const testSchema = new MainSchema({
  title: [String],
});

module.exports = mongoose.model("Test", testSchema);
