module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'invoices',
      'statusInvoiceId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'statusInvoices', // Sửa tên bảng
          key: 'id',
        },
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'invoices', // Sửa tên bảng cho đúng
      'statusInvoiceId' // Sửa tên cột cho đúng
    );
  }
};
