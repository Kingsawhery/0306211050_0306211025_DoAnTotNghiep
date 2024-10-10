module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("sub_products", "image", {
      type: Sequelize.STRING,
    });
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  },
};
