module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
                'product_details',
                'rate',
                 Sequelize.INTEGER
               )
    },
  
    down: function (queryInterface, Sequelize) {
      // logic for reverting the changes
    }
  };