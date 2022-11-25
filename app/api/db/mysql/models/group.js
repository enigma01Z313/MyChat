"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("group", {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  });
