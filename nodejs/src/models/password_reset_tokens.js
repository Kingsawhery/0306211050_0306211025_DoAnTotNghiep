"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class password_reset_tokens extends Model {}

  // PasswordResetToken.associate = function (models) {
  //     // Define associations here if needed
  // };

  password_reset_tokens.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "password_reset_tokens",
      timestamps: false,
    }
  );

  return password_reset_tokens;
};
