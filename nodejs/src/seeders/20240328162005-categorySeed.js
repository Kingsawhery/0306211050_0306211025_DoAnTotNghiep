'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
    return queryInterface.bulkInsert(
      'categories',
      [       
        {
          name: 'Iphone',  
          slug: '/iphone',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Macbook',  
          slug: '/macbook',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ipad',  
          slug: '/ipad',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Watch',  
          slug: '/watch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Airpod',  
          slug: '/airpod',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {})
   
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
