'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type_classify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      type_classify.belongsToMany(models.category, {through:"category_type_classify"})
      type_classify.hasMany(models.type_classify_detail)
      type_classify.belongsToMany(models.product_detail,{through:"product_detail_type_classify"})

    }
  };
  type_classify.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'type_classify',
    deletedAt:"softDelete",
    paranoid:true,

  });
  return type_classify;
};