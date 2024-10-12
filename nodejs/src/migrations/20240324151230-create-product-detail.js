"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("product_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
<<<<<<< HEAD
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
=======
>>>>>>> 299f8b221d8a62e1f1009a42b339bfdb9e6cf064
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      softDelete: Sequelize.DATE,

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("product_details");
  },
};
