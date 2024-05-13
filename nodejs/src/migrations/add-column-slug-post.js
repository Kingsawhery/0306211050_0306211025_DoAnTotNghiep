module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
                'posts',
                'slug',
                 Sequelize.STRING
               )
    },
  
    down: function (queryInterface, Sequelize) {
      // logic for reverting the changes
    }
  };