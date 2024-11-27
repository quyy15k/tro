"use strict";
const { Model, ENUM } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "userId", as: "user" });
      User.hasMany(models.History, { foreignKey: "userId", as: "histories" });
      User.hasMany(models.Favorite, { foreignKey: "userId", as: "favorites" });
      User.hasMany(models.Feedback, { foreignKey: "userId", as: "feedbacks" });
      User.hasMany(models.Post_View, { foreignKey: "userId", as: "postViews" });
      User.hasMany(models.Search_History, {
        foreignKey: "userId",
        as: "searchHistories",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      zalo: DataTypes.STRING,
      fbUrl: DataTypes.STRING,
      avatar: DataTypes.BLOB,
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
