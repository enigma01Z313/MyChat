const { dbHost, dbName, dbUser, dbPass, dbNameTest } = require("./dbMysql");

module.exports = {
  development: {
    username: 'chatUsr',
    password: 'z&7#LSGEP47duGfXR&qn',
    database: 'MyChatter',
    host: dbHost,
    dialect: "mysql",
    operatorsAliases: "0",
  },
  test: {
    username: dbUser,
    password: dbPass,
    database: dbNameTest,
    host: dbHost,
    dialect: "mysql",
    operatorsAliases: "0",
    logging: false,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: "0",
  },
};
