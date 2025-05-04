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
      Invoice.belongsTo(models.promotion, { foreignKey: "statusInvoiceId" });
      Invoice.belongsTo(models.statusInvoice,{
        foreignKey: "statusInvoiceId"
      });
      Invoice.belongsTo(models.paymentMethod,{
        foreignKey: "paymentMethodId"
      });
    }
  }
  Invoice.init(
    {
      dayShip: DataTypes.DATE,
      invoiceCode: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      promotionId: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
      totalNotIncludePro: DataTypes.FLOAT,
      statusInvoiceId:DataTypes.INTEGER,
      paymentMethodId:DataTypes.INTEGER,
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
