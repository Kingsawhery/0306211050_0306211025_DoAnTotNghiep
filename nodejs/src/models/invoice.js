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
      Invoice.belongsTo(models.Promotion, { foreignKey: "promotionId " });
    }
  }
  Invoice.init(
    {
      dayShip: DataTypes.DATE,
      status: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      procedure_invoice: DataTypes.STRING,
      promotionId: DataTypes.INTEGER,
      status_invoice: DataTypes.STRING,
      price: DataTypes.FLOAT,
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
