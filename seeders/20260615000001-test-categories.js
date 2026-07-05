'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Technology', slug: 'technology', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Science', slug: 'science', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Design', slug: 'design', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Programming', slug: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'AI & Machine Learning', slug: 'ai-machine-learning', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Web Development', slug: 'web-development', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mobile Apps', slug: 'mobile-apps', createdAt: new Date(), updatedAt: new Date() },
      { name: 'DevOps', slug: 'devops', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cybersecurity', slug: 'cybersecurity', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cloud Computing', slug: 'cloud-computing', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Data Science', slug: 'data-science', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Blockchain', slug: 'blockchain', createdAt: new Date(), updatedAt: new Date() },
      { name: 'UX Research', slug: 'ux-research', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Startup', slug: 'startup', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Productivity', slug: 'productivity', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Open Source', slug: 'open-source', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Database', slug: 'database', createdAt: new Date(), updatedAt: new Date() },
      { name: 'API Design', slug: 'api-design', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Testing', slug: 'testing', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Career', slug: 'career', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const slugs = [
      'technology', 'science', 'design', 'programming', 'ai-machine-learning',
      'web-development', 'mobile-apps', 'devops', 'cybersecurity', 'cloud-computing',
      'data-science', 'blockchain', 'ux-research', 'startup', 'productivity',
      'open-source', 'database', 'api-design', 'testing', 'career'
    ];
    
    await queryInterface.bulkDelete('Categories', {
      slug: {
        [Sequelize.Op.in]: slugs
      }
    }, {});
  }
};
