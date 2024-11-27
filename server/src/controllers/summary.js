import * as services from "../services/summary";

export const getOverview = async (req, res) => {
  try {
    const response = await services.getOverviewSerivce();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
export const userSummay = async (req, res) => {
  try {
    const response = await services.userSummaryService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
export const postSummay = async (req, res) => {
  try {
    const response = await services.postSummaryService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
