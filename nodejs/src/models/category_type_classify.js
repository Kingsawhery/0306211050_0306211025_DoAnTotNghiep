'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_type_classify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category_type_classify.belongsTo(models.category, {
        foreignKey: 'categoryId',
      });
      category_type_classify.belongsTo(models.type_classify, {
        foreignKey: 'typeClassifyId',
      });
    }
  };
  category_type_classify.init({
    categoryId: DataTypes.INTEGER,
    typeClassifyId: DataTypes.INTEGER  
  }, {
    sequelize,
    modelName: 'category_type_classify',
    deletedAt:"softDelete",
    paranoid:true,

  });
  return category_type_classify;
};