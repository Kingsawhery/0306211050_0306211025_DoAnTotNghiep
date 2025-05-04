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
      User.belongsTo(models.role,{
        foreignKey:"roleId"
      })
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
      code: DataTypes.INTEGER,
      birthday:{
        type: DataTypes.DATE,
      },
      gender:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      roleId:{
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
      address: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      deletedAt: "softDelete",
      paranoid: true,
    }
  );
  return User;
};
