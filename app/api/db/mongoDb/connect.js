const tunnel = require("tunnel-ssh");
const mongoose = require("mongoose");

const localPort = 27018;

const config = {
  username: "root",
  password: "B/:$h8;We",
  host: "185.141.134.73", //192.168.9.104
  port: 22,
  dstHost: "localhost",
  dstPort: "27017", //27017
  localHost: "127.0.0.1",
  localPort,
};

const connectToMongo = () => {
  tunnel(config, (error, server) => {
    if (error) {
      console.log("SSH connection error: " + error);
    }

    const url = "mongodb://127.0.0.1:27018/MyChat";
    mongoose.connect(url, { useNewUrlParser: true });
    var mongoDB = mongoose.connection;
    mongoDB.on("error", console.error.bind(console, "DB connection error:"));
    mongoDB.once("open", function () {
      console.log("Mongo connection successful");
    });
  });
};

module.exports = connectToMongo;
