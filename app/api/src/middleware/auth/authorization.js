const fError = require("../../utils/fError");

const authorizationDef = (permission) => async (req, res, next) => {
  const {
    authenticatedUser: { permissions: grantedPermissions },
    theSameUser,
  } = res;

  if (theSameUser) return next();

  if (!grantedPermissions.includes(permission))
    return next(
      fError(
        401,
        `Permission denied, you need permission '${permission}'`,
        `عدم دسترسی به ریسورس فراخوانی دشه، '${permission}'`
      )
    );

  return next();
};

const authorizationAnd = (permissions) => async (req, res, next) => {
  const {
    authenticatedUser: { permissions: grantedPermissions },
    theSameUser,
  } = res;

  if (theSameUser) return next();

  for (permission of permissions)
    if (!grantedPermissions.includes(permission))
      return next(
        fError(
          401,
          `Permission denied, you need permissions '${permissions.join(
            "', '"
          )}'`,
          `عدم دسترسی به ریسورس فراخوانی دشه، '${permissions.join("', '")}'`
        )
      );

  return next();
};

const authorizationOr = (permissions) => async (req, res, next) => {
  const {
    authenticatedUser: { permissions: grantedPermissions },
    theSameUser,
  } = res;

  if (theSameUser) return next();

  for (permission of permissions)
    if (grantedPermissions.includes(permission)) return next();

  return next(
    fError(
      401,
      `Permission denied, you need one of '${permissions.join(
        "', '"
      )}' permissions`,
      `عدم دسترسی به ریسورس فراخوانی دشه، '${permissions.join("', '")}'`
    )
  );
};

module.exports = {
  def: authorizationDef,
  and: authorizationAnd,
  or: authorizationOr,
};
