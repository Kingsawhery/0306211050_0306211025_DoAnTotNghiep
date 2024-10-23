module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return Promise.all([
      queryInterface.addColumn(
        'users',
      'roleId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', // Sửa tên bảng nếu cần
          key: 'id',
        },
      }
      ),
      queryInterface.addColumn(
        'users',
        'status',
        Sequelize.BOOLEAN
      )
    ]);
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn(
        'users',
        'roleId'
      ),
      queryInterface.removeColumn(
        'users',
        'status'
      )
    ]);
  }
}