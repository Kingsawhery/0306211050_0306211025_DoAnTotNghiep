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

      'products',
        [       
          {
            name: 'Iphone 11',  
            subCategoryId: 1,
            price: 9690000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 11 Pro',  
            subCategoryId: 1,
            price: 12960000,
            categoryId:1,
            status:true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 11 Pro Max',  
            subCategoryId: 1,
            price: 16090000,
            categoryId:1,
            status:true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 12 Mini',  
            subCategoryId: 2,
            price: 9990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 12',  
            subCategoryId: 2,
            price: 10990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 12 Pro',  
            subCategoryId: 2,
            price: 14990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 12 Pro Max',  
            subCategoryId: 2,
            price: 18990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 13 Mini',  
            subCategoryId: 3,
            price: 10990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 13',  
            subCategoryId: 3,
            price: 11990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 13 Pro',  
            subCategoryId: 3,
            price: 15990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 13 Pro Max',  
            subCategoryId: 3,
            price: 20990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 14',  
            subCategoryId: 4,
            price: 13990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 14 Plus',  
            subCategoryId: 4,
            price: 17990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 14 Pro',  
            subCategoryId: 4,
            price: 20990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 14 Pro Max',  
            subCategoryId: 4,
            price: 24990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 15',  
            subCategoryId: 5,
            price: 24990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 15 Plus',  
            subCategoryId: 5,
            price: 27990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 15 Pro',  
            subCategoryId: 5,
            price: 29990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Iphone 15 Pro Max',  
            subCategoryId: 5,
            price: 35990000,
            status:true,
            categoryId:1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 16 M1 Pro (16 Core/16GB/1TB)',  
            subCategoryId: 6,
            price: 48990000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 13 inch M2 (10 core| 8GB RAM| 256GB SSD) ',  
            subCategoryId: 6,
            price: 29790000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 16 M1 Pro (16 Core/16GB/512SSD) ',  
            subCategoryId: 6,
            price: 44990000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 13 inch M2 (10 core| 16GB RAM| 512GB SSD) ',  
            subCategoryId: 6,
            price: 39990000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            name: 'MacBook Pro 13 inch M2 (10 core| 16GB RAM| 256GB SSD)',  
            subCategoryId: 6,
            price: 36000000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },{
            name: 'MacBook Pro 16 inch M2 Pro (19 Core| 32GB| 512GB) - CTO',  
            subCategoryId: 6,
            price: 67990000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 16 inch M2 Pro (19 Core| 32GB| 1TB) - CTO',  
            subCategoryId: 6,
            price: 72990000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 16 inch M2 Max (38 Core| 64GB| 1TB) - CTO',  
            subCategoryId: 6,
            price: 90990000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 13 inch M2 (10 core| 8GB RAM| 512GB SSD)',  
            subCategoryId: 6,
            price: 34490000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 16 inch M2 Max (38 Core| 32GB| 1TB)',  
            subCategoryId: 6,
            price: 81950000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 16 inch M2 Pro (19 Core| 16GB| 1TB)',  
            subCategoryId: 6,
            price: 63950000,
            status:true,
            categoryId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'MacBook Pro 16 inch M2 Pro (19 Core| 16GB| 512GB)',  
            subCategoryId: 6,
            price: 58350000,
            status:true,
            categoryId:2,
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
