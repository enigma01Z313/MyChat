const theSameUser = (req, res, next) => {
  const { authenticatedUser: user } = res;
  const { uuid: targetUser } = req.params;

  res.theSameUser =
    user?.uuid && targetUser && targetUser === user?.uuid ? true : false;

  next();
};

module.exports = theSameUser;
