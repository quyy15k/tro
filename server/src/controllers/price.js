import * as services from "../services/price";

export const getPrices = async (req, res) => {
  try {
    const response = await services.getPricesSerivce();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Price controller: " + error,
    });
  }
};
export const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.deletePrice(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Price controller: " + error,
    });
  }
};

export const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const response = await services.updatePrice(id, payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Price controller: " + error,
    });
  }
};
export const createPrice = async (req, res) => {
  try {
    const payload = req.body;
    const response = await services.createPrice(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Price controller: " + error,
    });
  }
};
