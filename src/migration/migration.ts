import { DataTypes } from 'sequelize';

const migration = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });

  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropAllTables();
  },
};

export default migration;