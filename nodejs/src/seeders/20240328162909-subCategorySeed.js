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
      'sub_categories',
      [       
        {
          name: 'Iphone 11',  
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Iphone 12',  
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Iphone 13',  
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Iphone 14',  
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Iphone 15',  
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'MacBook Pro M2',  
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'MacBook Pro M3',  
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'MacBook Air',  
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'iMac',  
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'iMac Mini',  
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mac Pro',  
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mac Studio',  
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ipad Pro M1',  
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ipad Pro M2',  
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ipad Air',  
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ipad 9',  
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ipad 10',  
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ipad Mini',  
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple Watch Ultra 2',  
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple Watch Series 9',  
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple Watch SE',  
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple Watch Series 8',  
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple Watch Series 7',  
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple Watch Series 6',  
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple Watch Series 3',  
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Balo/ Túi chống sốc',  
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Chuột/ Bàn phím',  
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bút Apple Pencil',  
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Dây đeo Apple Watch',  
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'AirTags',  
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Apple TV',  
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Âm Thanh',  
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sạc, cáp',  
          categoryId: 5,
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
