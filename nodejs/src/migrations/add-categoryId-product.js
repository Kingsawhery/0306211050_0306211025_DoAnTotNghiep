module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("products", "categoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
    });
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  },
};
