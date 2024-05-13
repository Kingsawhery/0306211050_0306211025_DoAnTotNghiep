'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      sub_category.belongsTo(models.category,{
        foreignKey: "categoryId"
      });
      sub_category.hasMany(models.product);
    }
  };
  sub_category.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sub_category',
    deletedAt:"softDelete",
    paranoid:true,

  });
  return sub_category;
};