module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
                'sub_categories',
                'image',
                 Sequelize.STRING
               )
    },
  
    down: function (queryInterface, Sequelize) {
      // logic for reverting the changes
    }
  };