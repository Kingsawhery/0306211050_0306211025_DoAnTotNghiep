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
    */
    return queryInterface.bulkInsert(

      'product_details',
        [  
          {
            productId:1,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },     
          {
            productId:2,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:3,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:4,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:5,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:6,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:7,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:8,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:9,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:10,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:11,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:12,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:13,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:14,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },

          {
            productId:15,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:16,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:17,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:18,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:19,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:20,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:21,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:22,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:23,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:24,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:25,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:26,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:27,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:28,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:29,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:30,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            productId:31,
            stock:300,
            createdAt: new Date(),
            updatedAt: new Date()
          },

        ]
      )
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
