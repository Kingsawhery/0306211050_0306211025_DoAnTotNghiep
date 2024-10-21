'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_product_type_classify_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_product_type_classify_detail.belongsTo(models.sub_product, {
        foreignKey: 'subProductId',
      });
      sub_product_type_classify_detail.belongsTo(models.type_classify_detail, {
        foreignKey: 'typeClassifyDetailId',
      });
    }
  };
  sub_product_type_classify_detail.init({
    subProductId: DataTypes.INTEGER,
    typeClassifyDetailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sub_product_type_classify_detail',
    deletedAt:"softDelete",
    paranoid:true,
  });
  return sub_product_type_classify_detail;
};