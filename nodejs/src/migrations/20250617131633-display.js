module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'brand',
      'display',
     Sequelize.BOOLEAN
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