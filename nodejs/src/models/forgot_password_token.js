"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class forgot_password_tokens extends Model {}

  // PasswordResetToken.associate = function (models) {
  //     // Define associations here if needed
  // };

  forgot_password_tokens.init(
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
      modelName: "forgot_password_tokens",
      timestamps: false,
    }
  );

  return forgot_password_tokens;
};
