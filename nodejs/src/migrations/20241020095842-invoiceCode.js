module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'invoices',
      'invoiceCode', {
        type: Sequelize.STRING,
      } // Đóng dấu ngoặc
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'invoices', // Tên bảng
      'invoiceCode' // Tên cột
    );
  }
};
