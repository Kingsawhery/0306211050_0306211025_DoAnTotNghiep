'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_detail_type_classifies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productDetailId: {
        type: Sequelize.INTEGER,
        references: {
          model:"product_details",
          key:"id"
        }
      },
      typeClassifyId: {
        type: Sequelize.INTEGER,
        references: {
          model:"type_classifies",
          key:"id"
        }
      },
      softDelete:Sequelize.DATE,
      
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
    await queryInterface.dropTable('product_detail_type_classifies');
  }
};