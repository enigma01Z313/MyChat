"use strict";
const { Model } = require("sequelize");
const getStatus = require("../staticDb/simpleStatus");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Role }) {
      this.belongsTo(Role, { foreignKey: "role_id" });
    }

    permissions = this.get().Role?.permissions ?? "[]";
    roleData = {
      role: {
        id: this.get().Role?.uuid,
        name: this.get().Role?.name,
      },
      permissions: JSON.parse(this.permissions),
    };

    fullName = `${this.get().firstName ?? ""} ${this.get().lastName ?? ""}`;

    toJSON() {
      return {
        ...this.get(),
        id: this.uuid,
        ...this.roleData,
        status: getStatus(this.status),
        fullName: this.fullName,
        roleId: undefined,
        uuid: undefined,
        ip: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        tokenDuration: undefined,
        password: undefined,
        oneTimeLogin: undefined,
        role_id: undefined,
        Role: undefined,
      };
    }
  }
  User.init(
    {
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
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "role_id",
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
        defaultValue: 1,
      },
      publicLock: {
        allowNull: true,
        type: DataTypes.STRING(5000),
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
