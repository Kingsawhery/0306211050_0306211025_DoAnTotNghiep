'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_product.belongsTo(models.product_detail,{
        foreignKey: "productDetailId"
      })
      sub_product.belongsToMany(models.type_classify_detail,{through:"sub_product_type_classify_detail"})

    }
  };
  sub_product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    productDetailId:DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image:DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'sub_product',
    sequelize,
    deletedAt:"softDelete",
    paranoid:true,
  });
  return sub_product;
};