'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
    'product_detail_type_classifies',
    [  
      {
        productDetailId:1,
        typeClassifyId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        productDetailId:1,
        typeClassifyId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        productDetailId:2,
        typeClassifyId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        productDetailId:2,
        typeClassifyId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        productDetailId:3,
        typeClassifyId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        productDetailId:3,
        typeClassifyId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        productDetailId:4,
        typeClassifyId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        productDetailId:4,
        typeClassifyId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        productDetailId:5,
        typeClassifyId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        productDetailId:5,
        typeClassifyId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        productDetailId:6,
        typeClassifyId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        productDetailId:6,
        typeClassifyId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        productDetailId:7,
        typeClassifyId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        productDetailId:7,
        typeClassifyId:2,
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
