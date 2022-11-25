const { User, Artist, Group } = require("../../../db/mysql/models");

const getUsers = async (req, res, next) => {
  const users = await User.findAll({
    include: ["role"],
  });

  const artists = await Artist.findAll({
    include: [
      {
        model: Group,
        as: "groups",
        through: {
          attributes: [],
        },
      },
    ],
  });

  return res.json(artists);
};

module.exports = getUsers;
