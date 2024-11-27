import db from "../models";
import { Sequelize } from "sequelize";

export const addToFavorite = async (postId, userId) => {
  const favorite = await db.Favorite.findOne({ where: { postId, userId } });
  if (favorite) return;

  return await db.Favorite.create({ postId, userId });
};

export const removeFromFavorite = async (postId, userId) => {
  return await db.Favorite.destroy({ where: { postId, userId } });
};

export const listPostFavorite = async (userId) => {
  const favoriteAttribute = userId
    ? [
        Sequelize.literal(`(
          SELECT COUNT(1)
          FROM Favorites AS favorites
          WHERE favorites.postId = Post.id AND favorites.userId = '${userId}'
      )`),
        "favorite",
      ]
    : [Sequelize.literal("false"), "favorite"];
  const hadRentedAttribute = userId
    ? [
        Sequelize.literal(`EXISTS (
            SELECT 1
            FROM Histories AS history
            WHERE history.postId = Post.id AND history.userId = '${userId}'
        )`),
        "hadRented",
      ]
    : [Sequelize.literal("false"), "hadRented"];
  return await db.Post.findAll({
    where: {
      isActive: true,
    },
    include: [
      {
        model: db.Favorite,
        as: "favorites",
        where: { userId },
        attributes: [],
      },
      { model: db.Image, as: "images", attributes: ["image"] },
      {
        model: db.Attribute,
        as: "attributes",
        attributes: ["price", "acreage", "published", "hashtag"],
      },
      { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
    ],
    attributes: [
      "id",
      "title",
      "star",
      "address",
      "quantity",
      "description",
      favoriteAttribute,
      hadRentedAttribute,
    ],
  });
};
