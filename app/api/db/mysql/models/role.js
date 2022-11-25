"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("role", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      get() {
        return undefined;
      },
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    permissions: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "",
      get() {
        return JSON.parse(this.getDataValue("permissions"));
      },
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 1,
    },
  });
