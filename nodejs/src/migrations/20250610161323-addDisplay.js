'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'display', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'display');
  }
};
