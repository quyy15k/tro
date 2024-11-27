import db from "../models";

// GET ALL CATEGORY
export const getCategoriesSerivce = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get categories.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteCategory = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.destroy({
        where: { id },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Category deleted successfully."
          : "Failed to delete category.",
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateCategory = (id, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.update(payload, {
        where: { id },
      });

      resolve({
        err: response[0] ? 0 : 1,
        msg: response[0]
          ? "Category updated successfully."
          : "Failed to update category. Category not found or no changes made.",
      });
    } catch (error) {
      reject(error);
    }
  });
export const createCategory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.create(payload);

      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Category created successfully."
          : "Failed to create category.",
      });
    } catch (error) {
      reject(error);
    }
  });
