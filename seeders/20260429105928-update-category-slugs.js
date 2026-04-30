'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [categories] = await queryInterface.sequelize.query('SELECT id, name FROM "Categories" WHERE slug IS NULL');
    
    for (const category of categories) {
      const slug = category.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      await queryInterface.sequelize.query(
        `UPDATE "Categories" SET slug = ? WHERE id = ?`,
        {
          replacements: [slug, category.id],
          type: Sequelize.QueryTypes.UPDATE
        }
      );
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('UPDATE "Categories" SET slug = NULL');
  }
};
