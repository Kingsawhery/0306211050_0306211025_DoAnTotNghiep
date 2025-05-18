module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'products',
      'brandId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'brand',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // hoặc 'CASCADE' nếu bạn muốn xóa product khi brand bị xóa
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('products', 'brandId');
  }
};