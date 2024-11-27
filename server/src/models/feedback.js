"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      // Liên kết đến bảng User và Post
      Favorite.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Favorite.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }

  Favorite.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users", // Tên bảng users
          key: "id",
        },
        onDelete: "CASCADE",
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Posts", // Tên bảng posts
          key: "id",
        },
        onDelete: "CASCADE",
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }, // Giới hạn từ 1 đến 5
      },
    },
    {
      sequelize,
      modelName: "Feedback",
      timestamps: true,
    }
  );
  return Favorite;
};
