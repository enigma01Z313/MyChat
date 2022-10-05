const { User, Role } = require("../../../db/models");
const hash = require("../../utils/hash");
const createJWT = require("../../utils/createJWT");

const register = async (req, res, next) => {
  const { username, password } = req.body;

  const newUser = await User.create({
    username,
    password: hash("" + password),
    roleId: 2,
  });

  const user = await User.findOne({
    where: { uuid: newUser.uuid },
    include: Role,
  });

  const { accessToken, refreshToken } = createJWT(user);
  await user.update({ accessToken, refreshToken });
  res.jsonData = { accessToken, refreshToken, user, goto: "setup" };
  next();
};

module.exports = register;
