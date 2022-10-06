"use strict";

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const express = require("express");
const router = express.Router();

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    // console.log(path.join(__dirname, file));
    const routerItem = require(path.join(__dirname, file));
    const routerPath = file.split(".");

    router.use(`/${routerPath[0]}`, routerItem);
  });

module.exports = router;
