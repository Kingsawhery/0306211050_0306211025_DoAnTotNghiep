"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart, { foreignKey: "userId", as: "carts" });
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        defaultValue: "LOCAL",
      },
      username: DataTypes.STRING,
      image: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
      code: DataTypes.INTEGER,
      address: DataTypes.STRING,
      token: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      // deleteAt: "softDelete",
      // paranoid: true,
    }
  );
  return User;
};
