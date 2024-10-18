'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      promotion.belongsToMany(models.product,{through:"promotionProduct"})

    }
  };
  promotion.init({
    code: DataTypes.STRING,
    percent: DataTypes.FLOAT,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'promotion',
  });
  return promotion;
};