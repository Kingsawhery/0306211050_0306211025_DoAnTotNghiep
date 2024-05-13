'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sub_product_type_classify_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subProductId: {
        type: Sequelize.INTEGER,
        references:{
          model:"sub_products",
          key:"id"
        }
      },
      typeClassifyDetailId: {
        type: Sequelize.INTEGER,
        references:{
          model:"type_classify_details",
          key:"id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sub_product_type_classify_details');
  }
};