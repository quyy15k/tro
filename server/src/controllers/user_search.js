import * as userSearchService from "../services/user_search";

export const createNewUserSearch = async (req, res) => {
  const { searchText } = req.body;
  try {
    const response = await userSearchService.createUserSearch({
      searchText,
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

export const getALlUserSearch = async (req, res) => {
  try {
    const { user } = req;
    const histories = await userSearchService.getALlUserSearch({
      userId: user.id,
    });
    return res.status(200).json(histories);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const getTopKeywords = async (req, res) => {
  try {
    const histories = await userSearchService.getTopSearchKeywords();
    return res.status(200).json(histories);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
export const deleteUserSearch = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.body;
    const histories = await userSearchService.deleteUserSearch({
      userId: user.id,
      id: id,
    });
    return res.status(200).json(histories);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
