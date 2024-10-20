"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsToMany(models.sub_product, {
        through: "sub_product_invoice",
      });
      Invoice.belongsTo(models.promotion, { foreignKey: "promotionId" });
      Invoice.belongsTo(models.promotion, { foreignKey: "statusInvoceId" });

    }
  }
  Invoice.init(
    {
      dayShip: DataTypes.DATE,
      invoiceCode: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      promotionId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      total: DataTypes.FLOAT,
      statusInvoceId:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Invoice",
      deletedAt:"softDelete",
    paranoid:true,
    }
  );
  return Invoice;
};
