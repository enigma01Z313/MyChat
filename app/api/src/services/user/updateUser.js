const hash = require("../../utils/hash");

const updateUser = async (req, res, next) => {
  let uppedData = false;
  const { jsonData: user, theSameUser } = res;
  const {
    phone,
    firstName,
    lastName,
    imageId,
    status,
    roleId,
    password,
    publicLock,
  } = req.body;

  if (phone && phone !== user.phone) user.phone = uppedData = phone;

  if (firstName && firstName !== user.firstName)
    user.firstName = uppedData = firstName;

  if (lastName && lastName !== user.lastName)
    user.lastName = uppedData = lastName;

  if (imageId && imageId !== user.imageId) user.imageId = uppedData = imageId;

  if (
    !theSameUser &&
    typeof status !== typeof undefined &&
    status !== user.status
  )
    user.status = uppedData = status;

  if (!theSameUser && roleId && roleId !== user.roleId)
    user.roleId = uppedData = roleId;

  if (theSameUser && publicLock && publicLock !== user.publicLock){
    user.publicLock = uppedData = publicLock;
    user.status = 1;
  }

  if (password && password !== user.password)
    user.password = uppedData = hash(password);

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  res.jsonData = await user.save();
  next();
};

module.exports = updateUser;
