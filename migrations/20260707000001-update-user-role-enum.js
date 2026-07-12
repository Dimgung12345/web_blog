'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Users_role" ADD VALUE IF NOT EXISTS 'authenticated'`
    );
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Users_role" ADD VALUE IF NOT EXISTS 'editor'`
    );
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'editor', 'authenticated'),
      defaultValue: 'authenticated'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('admin'),
      defaultValue: 'admin'
    });
  }
};
