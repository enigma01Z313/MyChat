const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");
const { dbName, dbHost, dbUser, dbPass } = require("../config/dbMysql");
const connectToMongo = require("./api/db/mongoDb/connect");

connectToMongo();

//mysql database conncetion
const mysqlDB = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
});
mysqlDB.connect(function (err) {
  if (err) throw err;
  console.log("mysql Connected!");
});

const apiRouter = require("./api/routes");
const staticRouter = require("./public/router");
const handleError = require("./handleError");
const handleCors = require("./handleCors");

const myApp = (globalEmmiter) => {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(handleCors);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "/public"));

  app.use(
    "/api",
    (req, res, next) => {
      res.globalEmmiter = globalEmmiter;
      next();
    },
    apiRouter
  );
  app.get("/*", staticRouter);

  //handling 404 ndpoints
  app.use("/", (req, res, next) => {
    const error = new Error("Resource Not Found");
    error.status = 404;
    next(error);
  });

  //ultimate error handler
  app.use(handleError);

  return app;
};

module.exports = myApp;
