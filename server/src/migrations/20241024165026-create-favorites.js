"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Favorites",
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Users", // Tên bảng users
            key: "id",
          },
          onDelete: "CASCADE",
          primaryKey: true,
        },
        postId: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Posts", // Tên bảng posts
            key: "id",
          },
          onDelete: "CASCADE",
          primaryKey: true,
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["userId", "postId"],
          },
        ],
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Favorites");
  },
};
