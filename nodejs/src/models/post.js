'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.product,{
        foreignKey: "productId"
      })
      post.hasMany(models.product_detail);

    }
  };
  post.init({
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    content: DataTypes.TEXT,
    productId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'post',
    deletedAt:"softDelete",
    paranoid:true,
  });
  return post;
};