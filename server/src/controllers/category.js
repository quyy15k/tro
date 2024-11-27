import * as services from "../services/category";

export const getCategories = async (req, res) => {
  try {
    const response = await services.getCategoriesSerivce();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.deleteCategory(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const response = await services.updateCategory(id, payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
export const createCategory = async (req, res) => {
  try {
    const payload = req.body;
    const response = await services.createCategory(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
