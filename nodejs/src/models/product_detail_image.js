'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_detail_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_detail_image.belongsTo(models.product_detail,{
        foreignKey: "productDetailId"
      })
      product_detail_image.belongsTo(models.type_classify_detail,{
        foreignKey: "typeClassifyDetailId"
      })

    }
  };
  product_detail_image.init({
    image: DataTypes.STRING,
    productDetailId :DataTypes.INTEGER,
    typeClassifyDetailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_detail_image',
  });
  return product_detail_image;
};