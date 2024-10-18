'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promotionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      promotionProduct.belongsTo(models.product, {
        foreignKey: 'productId',
      });
      promotionProduct.belongsTo(models.promotion, {
        foreignKey: 'promotionId',
      });
    }
  };
  promotionProduct.init({
    productId: DataTypes.INTEGER,
    promotionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'promotionProduct',
  });
  return promotionProduct;
};