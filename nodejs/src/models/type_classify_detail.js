'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type_classify_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      type_classify_detail.belongsTo(models.type_classify,
        {
          foreignKey:"typeClassifyId"
        }),
        type_classify_detail.belongsToMany(models.product_detail,{through:"product_detail_type_classify_detail"})
        type_classify_detail.belongsToMany(models.sub_product,{through:"sub_product_type_classify_detail"})
        type_classify_detail.hasMany(models.product_detail_image)


    }
  };
  type_classify_detail.init({
    name: DataTypes.STRING,
    typeClassifyId: DataTypes.INTEGER,
    color_code:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'type_classify_detail',
    deletedAt:"softDelete",
    paranoid:true,

  });
  return type_classify_detail;
};