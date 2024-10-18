module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'invoices',
      'promotionId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'promotions', // Sửa tên bảng nếu cần
          key: 'id',
        },
      } // Đóng dấu ngoặc
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'invoices', // Tên bảng
      'promotionId' // Tên cột
    );
  }
};
