module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
                'posts',
                'image',
                 Sequelize.STRING
               )
    },
  
    down: function (queryInterface, Sequelize) {
      // logic for reverting the changes
    }
  };