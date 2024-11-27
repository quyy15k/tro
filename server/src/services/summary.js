import db from "../models";
import moment from "moment";

export const getOverviewSerivce = () =>
  new Promise(async (resolve, reject) => {
    try {
      const userCount = await db.User.count();
      const postCount = await db.Post.count();
      const historyCount = await db.History.count();
      resolve({
        err: 0,
        msg: "OK",
        response: {
          userCount,
          postCount,
          historyCount,
        },
      });
    } catch (error) {
      reject(error);
    }
  });

export const userSummaryService = async () => {
  try {
    const usersByMonth = await db.User.findAll({
      attributes: [
        [
          db.Sequelize.fn(
            "DATE_FORMAT",
            db.Sequelize.col("createdAt"),
            "%Y-%m"
          ),
          "month",
        ],
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "userCount"],
      ],
      group: [
        db.Sequelize.fn("DATE_FORMAT", db.Sequelize.col("createdAt"), "%Y-%m"),
      ],
      order: [
        [
          db.Sequelize.fn(
            "DATE_FORMAT",
            db.Sequelize.col("createdAt"),
            "%Y-%m"
          ),
          "ASC",
        ],
      ],
    });

    const firstMonth = "2023-01";
    const currentMonth = moment().format("YYYY-MM");

    const months = [];
    let current = moment(firstMonth, "YYYY-MM");
    const end = moment(currentMonth, "YYYY-MM");

    while (current <= end) {
      months.push(current.format("YYYY-MM"));
      current.add(1, "month");
    }
    const responseData = months.map((month) => {
      const userData = usersByMonth.find(
        (item) => item.dataValues.month === month
      );
      return {
        month,
        userCount: userData ? parseInt(userData.dataValues.userCount, 10) : 0,
      };
    });

    return {
      err: 0,
      msg: "OK",
      response: responseData,
    };
  } catch (error) {
    return {
      err: 1,
      msg: error.message || "An error occurred while fetching user summary",
    };
  }
};

export const postSummaryService = async () => {
  try {
    const postByMonth = await db.Post.findAll({
      attributes: [
        [
          db.Sequelize.fn(
            "DATE_FORMAT",
            db.Sequelize.col("createdAt"),
            "%Y-%m"
          ),
          "month",
        ],
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "postCount"],
      ],
      group: [
        db.Sequelize.fn("DATE_FORMAT", db.Sequelize.col("createdAt"), "%Y-%m"),
      ],
      order: [
        [
          db.Sequelize.fn(
            "DATE_FORMAT",
            db.Sequelize.col("createdAt"),
            "%Y-%m"
          ),
          "ASC",
        ],
      ],
    });

    const firstMonth = "2023-01";
    const currentMonth = moment().format("YYYY-MM");

    const months = [];
    let current = moment(firstMonth, "YYYY-MM");
    const end = moment(currentMonth, "YYYY-MM");

    while (current <= end) {
      months.push(current.format("YYYY-MM"));
      current.add(1, "month");
    }
    const responseData = months.map((month) => {
      const userData = postByMonth.find(
        (item) => item.dataValues.month === month
      );
      return {
        month,
        postCount: userData ? parseInt(userData.dataValues.postCount, 10) : 0,
      };
    });

    return {
      err: 0,
      msg: "OK",
      response: responseData,
    };
  } catch (error) {
    return {
      err: 1,
      msg: error.message || "An error occurred while fetching user summary",
    };
  }
};
