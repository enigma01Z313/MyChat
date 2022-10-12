const { User } = require("../../api/db/mysql/models");

const authontication = async (accessToken) =>
  (user = await User.findOne({ where: { accessToken } }));

module.exports = authontication;
