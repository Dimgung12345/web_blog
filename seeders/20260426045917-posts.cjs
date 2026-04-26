'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Posts", [
      {
        title: "Peran Teknologi dalam Kehidupan Sehari-hari.",
        content: "Teknologi telah menjadi bagian integral dari kehidupan kita sehari-hari, mempengaruhi berbagai aspek mulai dari komunikasi hingga pekerjaan. Dengan kemajuan teknologi, kita dapat terhubung dengan orang di seluruh dunia, mengakses informasi dengan mudah, dan meningkatkan efisiensi dalam berbagai bidang. Namun, penting untuk menggunakan teknologi dengan bijak agar tidak mengganggu keseimbangan antara kehidupan digital dan kehidupan nyata.",
        UserId: 1, // admin
        CategoryId: 1, // Tech
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Pengaruh Sains dalam Kemajuan Teknologi",
        content: "Sains memainkan peran penting dalam kemajuan teknologi. Penemuan-penemuan ilmiah memberikan dasar untuk inovasi teknologi yang dapat meningkatkan kualitas hidup manusia.",
        UserId: 1, // admin
        CategoryId: 2, // sains
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
