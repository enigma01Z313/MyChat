const mongoose = require("mongoose");

class MainSchema {
  constructor(newParams = {}) {
    //defaitFields
    const mainSchema = new mongoose.Schema({
      ...newParams,
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

    //default hooks
    mainSchema.pre("save", function (next) {
      this.updatedAt = Date.now();
      next();
    });

    return mainSchema;
  }
}

module.exports = MainSchema;
