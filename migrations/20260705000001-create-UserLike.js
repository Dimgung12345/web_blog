'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserLikes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE"
      },
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Posts", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex("UserLikes", ["UserId", "PostId"], {
      unique: true,
      name: "user_likes_unique"
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserLikes");
  }
};
