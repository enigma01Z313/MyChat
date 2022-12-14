"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("option", {
    key: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
