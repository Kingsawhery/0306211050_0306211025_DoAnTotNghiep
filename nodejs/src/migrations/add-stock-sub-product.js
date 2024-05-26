module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("sub_products", "stock", Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  },
};
