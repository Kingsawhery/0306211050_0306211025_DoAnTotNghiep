'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_detail_type_classify_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productDetailId: {
        type: Sequelize.INTEGER,
        references:{
          model:"product_details",
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
    await queryInterface.dropTable('product_detail_type_classify_details');
  }
};