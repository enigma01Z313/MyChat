const { joinRoom } = require("./services");
// const { User } = require("../api/db/mysql/models");

const socketServices = (socket) => {
  // console.log(`new user connected to socket`);

  socket.on("joinRoom", joinRoom(socket));
};

module.exports = socketServices;
