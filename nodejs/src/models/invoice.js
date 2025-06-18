"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      invoice.belongsToMany(models.sub_product, {
        through: "sub_product_invoice",
      });
      invoice.belongsTo(models.promotion, { foreignKey: "promotionId" });
      invoice.belongsTo(models.promotion, { foreignKey: "statusInvoiceId" });
      invoice.belongsTo(models.statusInvoice,{
        foreignKey: "statusInvoiceId"
      });
      invoice.belongsTo(models.paymentMethod,{
        foreignKey: "paymentMethodId"
      });
      invoice.belongsTo(models.User,{
        foreignKey: "userId"
      });
      invoice.belongsToMany(models.sub_product,{through:"sub_product_invoices"});

    }
  }
  invoice.init(
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
      note: DataTypes.TEXT,
      statusInvoiceId:DataTypes.INTEGER,
      paymentMethodId:DataTypes.INTEGER,
      userId:DataTypes.INTEGER,
      paymentStatus:DataTypes.STRING,
      urlPayment:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "invoice",
      deletedAt:"softDelete",
    paranoid:true,
    }
  );
  return invoice;
};
