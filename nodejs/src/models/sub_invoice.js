"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sub_invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_invoice.belongsTo(models.Invoice, { foreignKey: "invoiceID" });
      sub_invoice.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  sub_invoice.init(
    {
      userId: DataTypes.INTEGER,
      invoiceId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sub_invoice",
    }
  );
  return sub_invoice;
};
