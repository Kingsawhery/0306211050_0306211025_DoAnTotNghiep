module.exports = {
    up: function(queryInterface, Sequelize) {
      // logic for transforming into the new state
      return Promise.all([
        queryInterface.addColumn(
          'users',
        'birthday', {
          type: Sequelize.DATE,
        }
        ),
        queryInterface.addColumn(
          'users',
          'gender',
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