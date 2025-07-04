'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'comments',
    timestamps: true,
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Comment.belongsTo(models.product_detail, {
      foreignKey: 'productDetailId',
      as: 'productDetail',
    });

    Comment.belongsTo(models.Comment, {
      foreignKey: 'parentId',
      as: 'parent',
    });

    Comment.hasMany(models.Comment, {
      foreignKey: 'parentId',
      as: 'replies',
    });
  };

  return Comment;
};
