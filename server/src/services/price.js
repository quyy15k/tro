import db from "../models";

// GET ALL PRICE
export const getPricesSerivce = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({
        raw: true,
        attributes: ["id", "code", "value", "order"],
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get prices.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deletePrice = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.destroy({
        where: { id },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Price deleted successfully."
          : "Failed to delete Price.",
      });
    } catch (error) {
      reject(error);
    }
  });

export const updatePrice = (id, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.update(payload, {
        where: { id },
      });

      resolve({
        err: response[0] ? 0 : 1,
        msg: response[0]
          ? "Price updated successfully."
          : "Failed to update Price. Price not found or no changes made.",
      });
    } catch (error) {
      reject(error);
    }
  });
export const createPrice = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.create(payload);

      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Price created successfully."
          : "Failed to create Price.",
      });
    } catch (error) {
      reject(error);
    }
  });
