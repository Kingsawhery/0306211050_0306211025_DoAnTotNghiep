'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.hasMany(models.sub_category);
      category.hasMany(models.product);
      category.belongsToMany(models.type_classify,{through:"category_type_classify"})
    }
  };
  category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    status:DataTypes.BOOLEAN,
    display:DataTypes.BOOLEAN

  }, {
    sequelize,
    paranoid:true,
    deletedAt:"softDelete",
    modelName: 'category',
  });
  return category;
};