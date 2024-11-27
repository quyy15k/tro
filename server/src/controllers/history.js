import * as historyService from "../services/history";

export const createNewHistoy = async (req, res) => {
  const { totalAmount, postId } = req.body;
  try {
    const response = await historyService.createHistory({
      totalAmount: totalAmount,
      postId: postId,
      userId: req.user.id,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const getHistories = async (req, res) => {
  try {
    const { user } = req;
    const histories = await historyService.getHistoriesOfUser(user.id);
    return res.status(200).json(histories);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const getHistoryDetail = async (req, res) => {
  try {
    const { user } = req;
    const { historyId } = req.params;
    const history = await historyService.getHistoryById(historyId);

    if (!history) throw new Error("Not found history");
    if (history.userId !== user.id) throw new Error("Not found history");

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
