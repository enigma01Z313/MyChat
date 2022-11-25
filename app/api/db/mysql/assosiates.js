module.exports = (db) => {
  const { Group, Artist, User, Role } = db;

  //group
  Group.belongsToMany(Artist, {
    through: "group_artist",
    as: "artists",
    foreignKey: "artist_id",
  });

  //group
  Artist.belongsToMany(Group, {
    through: "group_artist",
    as: "groups",
    foreignKey: "group_id",
  });

  //role
  User.belongsTo(Role, {
    foreignKey: {
      name: "roleId",
      field: "role_id",
      get: () => undefined,
    },
    as: "role",
  });

  return db;
};
