const { User, Role } = require("../../../db/mysql/models");
const hash = require("../../utils/hash");
const fError = require("../../utils/fError");
const createJWT = require("../../utils/createJWT");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username, password: hash(password) },
    include: Role,
  });
  if (!user)
    return next(
      fError(401, "Authentication Error", "نام کاربری یا رمز عبور اشتباه است")
    );

  const { accessToken, refreshToken } = createJWT(user);
  await user.update({ accessToken, refreshToken });
  res.jsonData = { accessToken, refreshToken, user };
  next();
};

module.exports = login;
