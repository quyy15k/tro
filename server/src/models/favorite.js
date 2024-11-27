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
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
      timestamps: false,
    }
  );
  return Favorite;
};
