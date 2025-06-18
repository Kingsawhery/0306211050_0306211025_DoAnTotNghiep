'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_detail_type_classify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_detail_type_classify.belongsTo(models.product_detail, {
        foreignKey: 'productDetailId',
      });
      product_detail_type_classify.belongsTo(models.type_classify, {
        foreignKey: 'typeClassifyId',
      });
    }
  };
  product_detail_type_classify.init({
    productDetailId: DataTypes.INTEGER,
    typeClassifyId: DataTypes.INTEGER,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product_detail_type_classify',
    deletedAt:"softDelete",
    paranoid:true,

  });
  return product_detail_type_classify;
};