"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post_View extends Model {
    static associate(models) {
      Post_View.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Post_View.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }
  Post_View.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      viewedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Post_View",
    }
  );
  return Post_View;
};
