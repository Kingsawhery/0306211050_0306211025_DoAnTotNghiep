"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sub_product_invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sub_product_invoice.init(
    {
      subProductId: DataTypes.INTEGER,
      invoiceId: DataTypes.INTEGER,
      quantity:DataTypes.INTEGER,
      total:DataTypes.FLOAT,
      totalNotPro:DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sub_product_invoices",
    }
  );
  return sub_product_invoice;
};
