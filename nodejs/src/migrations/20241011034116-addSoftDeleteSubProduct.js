module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
              
              'sub_products',
              'softDelete',
               Sequelize.DATE
             )
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  }
};