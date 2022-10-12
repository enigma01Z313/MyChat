"use strict";

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const express = require("express");
const router = express.Router();

const makeRouters = (io) => {
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      // console.log(path.join(__dirname, file));
      const routerItem = require(path.join(__dirname, file));
      const routerArr = file.split(".");
      const routerPath = routerArr.includes("io") ? routerArr[1] : routerArr[0];

      if (routerArr.includes("io")) {
        router.use(`/${routerPath}`, (req, res, next) => {
          res.io = io;
          return next();
        });
      }

      router.use(`/${routerPath}`, routerItem);
    });

  return router;
};

module.exports = makeRouters;
