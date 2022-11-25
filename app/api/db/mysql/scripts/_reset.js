"use strict";

const db = require("../models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database has been reset and ready to use :D");

  process.exit();
});
