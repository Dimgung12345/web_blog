'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("Users", [
    {
      username: "admin",
      email: "admin@gmail.com",
      password: "$2a$12$koov1Bv6gygnE6/l173Tlu3eV0eCGoQor48kSxXXWuZw9hVZFV6fq", // admin123
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
