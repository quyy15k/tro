"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Search_History extends Model {
    static associate(models) {
      Search_History.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Search_History.init(
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
      searchText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Search_History",
    }
  );
  return Search_History;
};
