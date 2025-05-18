module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'invoices',
      'paymentMethodId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'paymentMethods', 
          key: 'id',
        },
      } 
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'invoices', 
      'promotionId' 
    );
  }
};
