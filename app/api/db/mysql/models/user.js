"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
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
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    username: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
    },
    imageId: {
      type: DataTypes.STRING,
      field: "image_id",
    },
    ip: {
      type: DataTypes.STRING,
    },
    accessToken: {
      type: DataTypes.STRING,
      field: "access_token",
    },
    refreshToken: {
      type: DataTypes.STRING,
      field: "refresh_token",
    },
    tokenDuration: {
      type: DataTypes.INTEGER,
      field: "token_duration",
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    publicLock: {
      allowNull: true,
      type: DataTypes.STRING(5000),
    },
  });
