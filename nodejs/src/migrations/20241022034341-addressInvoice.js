module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'invoices',
      'address', {
        type: Sequelize.STRING,
      } 
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'invoices', // Tên bảng
      'address' // Tên cột
    );
  }
};
