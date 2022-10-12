const { User } = require("../../api/db/mysql/models");
const authontication = require("../utils/authontication");

const joinRoom = (socket) => async (accessToken) => {
  // console.log('trying to join room');

  if (!accessToken || accessToken == "") return socket.emit("logout");

  const user = await authontication(accessToken);
  if (!user) return socket.emit("logout");

  socket.join(user.uuid);
};

module.exports = joinRoom;
