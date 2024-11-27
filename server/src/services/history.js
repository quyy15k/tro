import { Sequelize, where } from "sequelize";
import db from "../models";

export const createHistory = (dataHistory) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await db.History.create({
        paymentDate: new Date(),
        createdAt: new Date(),
        totalAmount: dataHistory.totalAmount,
        userId: dataHistory.userId,
        postId: dataHistory.postId,
      });

      if (res) {
        const post = await db.Post.findOne({
          where: { id: dataHistory.postId },
        });
        if (post) {
          await db.Post.update(
            { quantity: post.quantity - 1 },
            { where: { id: dataHistory.postId } }
          );
        }
      }

      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });

export const getHistoriesOfUser = async (userId) => {
  const favoriteAttribute = userId
    ? [
        Sequelize.literal(`(
          SELECT COUNT(1)
          FROM Favorites AS favorites
          WHERE favorites.postId = post.id AND favorites.userId = '${userId}'
      )`),
        "favorite",
      ]
    : [Sequelize.literal("false"), "favorite"];
  const hadRentedAttribute = userId
    ? [
        Sequelize.literal(`EXISTS (
            SELECT 1
            FROM Histories AS history
            WHERE history.postId = post.id AND history.userId = '${userId}'
        )`),
        "hadRented",
      ]
    : [Sequelize.literal("false"), "hadRented"];
  return await db.History.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["id", "name", "avatar", "phone"],
      },
      {
        model: db.Post,
        as: "post",
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "quantity",
          favoriteAttribute,
          hadRentedAttribute,
        ],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const getHistoryById = async (historyId) => {
  return await db.History.findOne({ id: historyId });
};
