"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("artist", {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  });
