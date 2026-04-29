'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [posts] = await queryInterface.sequelize.query('SELECT id, title FROM "Posts" WHERE slug IS NULL');
    
    for (const post of posts) {
      const slug = post.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      await queryInterface.sequelize.query(
        `UPDATE "Posts" SET slug = ? WHERE id = ?`,
        {
          replacements: [slug, post.id],
          type: Sequelize.QueryTypes.UPDATE
        }
      );
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('UPDATE "Posts" SET slug = NULL');
  }
};
