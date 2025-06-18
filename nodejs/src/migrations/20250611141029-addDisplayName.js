module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'sub_categories',
      'displayName',
     Sequelize.STRING
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