module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'carts',
      'status', {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      } // Đóng dấu ngoặc
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'carts',
      'status'
    );
  }
};
