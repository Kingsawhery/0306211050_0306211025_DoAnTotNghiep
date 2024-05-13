module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
                'products',
                'promotion',
                 Sequelize.FLOAT
               )
    },
  
    down: function (queryInterface, Sequelize) {
      // logic for reverting the changes
    }
  };