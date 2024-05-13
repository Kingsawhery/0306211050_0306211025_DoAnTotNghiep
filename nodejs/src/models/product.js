'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.sub_category,{
        foreignKey:"subCategoryId"
      }),
      product.belongsTo(models.category,{
        foreignKey:"categoryId"
      });
      product.hasOne(models.product_detail)
      
    }
  };
  product.init({
    name: DataTypes.STRING,
    subCategoryId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN,
    categoryId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
    deletedAt:"softDelete",
    paranoid:true,

  });
  return product;
};