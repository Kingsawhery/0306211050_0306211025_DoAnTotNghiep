"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_detail.belongsTo(models.product, {
        foreignKey: "productId",
      });
      product_detail.belongsToMany(models.type_classify,{through:"product_detail_type_classify"}),
      product_detail.belongsToMany(models.type_classify_detail,{through:"product_detail_type_classify_detail"})
      product_detail.hasMany(models.product_detail_image)
      product_detail.hasMany(models.sub_product)

    }
  }
  product_detail.init(
    {
      productId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product_detail",
      deletedAt:"softDelete",
      paranoid:true,

    }
  );
  return product_detail;
};
