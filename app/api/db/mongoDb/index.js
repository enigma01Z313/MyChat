"use strict";

const fs = require("fs");
const path = require("path");
const mongoSchemas = {};

fs.readdirSync(__dirname)
  .filter((dir) => dir.indexOf(".") === -1)
  .forEach((dir) => {
    fs.readdirSync(path.join(__dirname, `./${dir}`))
      .filter((file) => file !== "index.js" && !file.includes("_"))
      .forEach((file) => {
        const fileName = file.split(".");
        const schema = require(path.join(__dirname, dir, file));
        mongoSchemas[fileName[0]] = schema;
      });
  });

module.exports = mongoSchemas;
