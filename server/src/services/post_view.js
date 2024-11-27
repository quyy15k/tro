import { Sequelize } from "sequelize";
import db from "../models";

export const createPost_view = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const found = await db.Post_View.findOne({
        where: {
          userId: data.userId,
          postId: data.postId,
        },
      });
      if (found) return resolve("found item");
      await db.Post_View.create({
        viewedAt: new Date(),
        userId: data.userId,
        postId: data.postId,
      });

      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });
export const getALlPostView = (page = 1, { limitPost, userId }) =>
  new Promise(async (resolve, reject) => {
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
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const limit = limitPost || +process.env.LIMIT;
      const response = await db.Post_View.findAndCountAll({
        where: {
          userId: userId,
        },
        raw: true,
        nest: true,
        offset: offset * limit,
        limit: limit,
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
            where: {
              isActive: true,
            },
            include: [
              { model: db.Image, as: "images", attributes: ["image"] },
              {
                model: db.Attribute,
                as: "attributes",
                attributes: ["price", "acreage", "published", "hashtag"],
              },
              {
                model: db.User,
                as: "user",
                attributes: ["name", "zalo", "phone"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
// export const getALlPostView = async (userId) => {
//   const favoriteAttribute = userId
//     ? [
//         Sequelize.literal(`(
//           SELECT COUNT(1)
//           FROM Favorites AS favorites
//           WHERE favorites.postId = post.id AND favorites.userId = '${userId}'
//       )`),
//         "favorite",
//       ]
//     : [Sequelize.literal("false"), "favorite"];
//   const hadRentedAttribute = userId
//     ? [
//         Sequelize.literal(`EXISTS (
//             SELECT 1
//             FROM Histories AS history
//             WHERE history.postId = post.id AND history.userId = '${userId}'
//         )`),
//         "hadRented",
//       ]
//     : [Sequelize.literal("false"), "hadRented"];
//   return await db.Post_View.findAll({
//     where: {
//       userId: userId,
//     },
//     include: [
//       {
//         model: db.User,
//         as: "user",
//         attributes: ["id", "name", "avatar", "phone"],
//       },
//       {
//         model: db.Post,
//         as: "post",
//         attributes: [
//           "id",
//           "title",
//           "star",
//           "address",
//           "description",
//           favoriteAttribute,
//           hadRentedAttribute,
//         ],
//         include: [
//           { model: db.Image, as: "images", attributes: ["image"] },
//           {
//             model: db.Attribute,
//             as: "attributes",
//             attributes: ["price", "acreage", "published", "hashtag"],
//           },
//           { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
//         ],
//       },
//     ],
//     order: [["createdAt", "DESC"]],
//   });
// };
