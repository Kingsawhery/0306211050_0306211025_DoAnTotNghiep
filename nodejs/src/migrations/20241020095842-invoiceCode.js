module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'invoices',
      'invoiceCode',
     Sequelize.DATE
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    // return queryInterface.removeColumn(
    //   'Todo',
    //   'completed'
    // );
  }
}