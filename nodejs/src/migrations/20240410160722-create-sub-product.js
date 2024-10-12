"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sub_products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      productDetailId: {
        type: Sequelize.INTEGER,
        references: {
          model: "product_details",
          key: "id",
        },
      },
      sold: {
        type: Sequelize.INTEGER,
<<<<<<< HEAD
=======
      },
      stock: {
        type: Sequelize.INTEGER,
>>>>>>> 299f8b221d8a62e1f1009a42b339bfdb9e6cf064
      },
      image: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      softDelete: Sequelize.DATE,

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sub_products");
  },
};
