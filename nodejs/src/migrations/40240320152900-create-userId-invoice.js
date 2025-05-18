module.exports = {
    up: async function(queryInterface, Sequelize) {
     
      await queryInterface.addColumn(
        'invoices',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users', // tên bảng users (nếu có quan hệ khóa ngoại)
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      );
      await queryInterface.addColumn(
        'invoices',
        'paymentStatus',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Chưa thanh toán'
        }
      );
    },
  
    down: async function(queryInterface, Sequelize) {
      await queryInterface.removeColumn('invoices', 'note');
      await queryInterface.removeColumn('invoices', 'userId');
      await queryInterface.removeColumn('invoices', 'paymentStatus');
    }
  }
  