const path = require("path");
require("dotenv").config({ path: path.resolve("./config/.env") });

module.exports = {
  dbHost: process.env.MYSQL_HOST,
  dbName:
    process.env.RUN_ENV === "server"
      ? process.env.MYSQL_NAME_ONLINE
      : process.env.MYSQL_NAME,
  dbUser:
    process.env.RUN_ENV === "server"
      ? process.env.MYSQL_USER_ONLINE
      : process.env.MYSQL_USER,
  dbPass:
    process.env.RUN_ENV === "server"
      ? process.env.MYSQL_PASS_ONLINE
      : process.env.MYSQL_PASS,
  dbNameTest: process.env.MYSQL_NAME_TEST,
  dbUrl: process.env.MONGOOSE_URL,
};
