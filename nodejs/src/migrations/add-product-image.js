module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
                'products',
                'image',
                 Sequelize.STRING
               )
    },
  
    down: function (queryInterface, Sequelize) {
      // logic for reverting the changes
    }
  };