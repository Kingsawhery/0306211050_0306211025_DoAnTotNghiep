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
      'product_detail_type_classify_details',
      [  
        {
          productDetailId:1,
          typeClassifyDetailId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          productDetailId:1,
          typeClassifyDetailId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },         
        {
          productDetailId:2,
          typeClassifyDetailId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          productDetailId:2,
          typeClassifyDetailId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },         
        {
          productDetailId:3,
          typeClassifyDetailId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          productDetailId:3,
          typeClassifyDetailId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },         
        {
          productDetailId:4,
          typeClassifyDetailId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          productDetailId:4,
          typeClassifyDetailId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },         
        {
          productDetailId:5,
          typeClassifyDetailId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          productDetailId:5,
          typeClassifyDetailId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },         
        {
          productDetailId:6,
          typeClassifyDetailId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          productDetailId:6,
          typeClassifyDetailId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },         
        {
          productDetailId:7,
          typeClassifyDetailId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          productDetailId:7,
          typeClassifyDetailId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },         
      ])
    
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
