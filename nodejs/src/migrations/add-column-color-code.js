module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
                'type_classify_details',
                'color_code',
                 Sequelize.STRING
               )
    },
  
    down: function (queryInterface, Sequelize) {
      // logic for reverting the changes
    }
  };