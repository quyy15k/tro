import { Sequelize } from "sequelize";
import db from "../models";

export const createUserSearch = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const found = await db.Search_History.findOne({
        where: {
          userId: data.userId,
          searchText: data.searchText,
        },
      });
      if (found) return resolve("found item");
      await db.Search_History.create({
        userId: data.userId,
        searchText: data.searchText,
      });

      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });
export const getALlUserSearch = ({ userId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const limit = 6;
      const response = await db.Search_History.findAll({
        where: {
          userId: userId,
        },
        raw: true,
        nest: true,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting history search is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getTopSearchKeywords = async () => {
  try {
    const topKeywords = await db.Search_History.findAll({
      limit: 4,
      attributes: [
        "searchText",
        [db.sequelize.fn("COUNT", db.sequelize.col("searchText")), "count"],
      ],
      group: ["searchText"],
      order: [[db.sequelize.literal("count"), "DESC"]],
    });

    return {
      err: topKeywords.length > 0 ? 0 : 1,
      msg: topKeywords.length > 0 ? "OK" : "Getting history search is failed.",
      response: topKeywords,
    };
  } catch (error) {
    return {
      err: 1,
      msg: `Error: ${error.message}`,
      response: [],
    };
  }
};

export const deleteUserSearch = ({ userId, id }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!userId || !id) {
        return resolve({
          err: 1,
          msg: "Missing required parameters.",
        });
      }
      const response = await db.Search_History.destroy({
        where: {
          userId,
          id,
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Search history deleted successfully."
          : "Search history not found or deletion failed.",
        response,
      });
    } catch (error) {
      reject({
        err: -1,
        msg: `Error while deleting search history: ${error.message}`,
      });
    }
  });
