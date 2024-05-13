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

      'type_classify_details',
        [       
          {
            name: 'Đỏ',  
            typeClassifyId:1,
            color_code:"#c80024",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Trắng',  
            typeClassifyId:1,
            color_code:"#fffaf5",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Tím',  
            typeClassifyId:1,
            color_code:"#d3cede",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Vàng',  
            typeClassifyId:1,
            color_code:"#ffe26c",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Đen',  
            typeClassifyId:1,
            color_code:"#1f1f1f",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Xanh Mint',  
            typeClassifyId:1,
            color_code:"#96dac0",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '64GB',  
            typeClassifyId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '128GB',  
            typeClassifyId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '256GB',  
            typeClassifyId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '512GB',  
            typeClassifyId:2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: '1TB',  
            typeClassifyId:2,
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
