"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Otp.init(
    {
      email: DataTypes.STRING,
      otp: DataTypes.STRING,
      time_expiration: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Otp",
    }
  );
  return Otp;
};
