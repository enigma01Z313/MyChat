'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'role_id'
      },
      imageId: {
        type: DataTypes.STRING,
        field: 'image_id'
      },
      ip: {
        type: DataTypes.STRING
      },
      accessToken: {
        type: DataTypes.STRING,
        field: 'access_token'
      },
      refreshToken: {
        type: DataTypes.STRING,
        field: 'refresh_token'
      },
      tokenDuration: {
        type: DataTypes.INTEGER,
        field: 'token_duration'
      },
      status: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      publicLock: {
        allowNull: true,
        type: DataTypes.STRING(5000),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};