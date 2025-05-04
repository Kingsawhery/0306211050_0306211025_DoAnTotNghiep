'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sub_product_invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sub_products', 
          key: 'id'
        },
      },
      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Invoices',
          key: 'id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      totalNotPro: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sub_product_invoices');
  }
};
