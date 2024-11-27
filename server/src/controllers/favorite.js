import * as favoriteService from "../services/favorite";

export const addToFavorite = async (req, res) => {
  try {
    const { user } = req;
    const { postId } = req.params;

    if (!postId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
      
      await favoriteService.addToFavorite(postId, user.id);

    return res.status(200).json({
      err: 0,
      msg: "add to favorite successed.",
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const removeFromFavorite = async (req, res) => {
  try {
    const { user } = req;
    const { postId } = req.params;

    if (!postId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });

    await favoriteService.removeFromFavorite(postId, user.id);

    return res.status(200).json({
      err: 0,
      msg: "remove from favorite successed.",
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const listPostFavorite = async (req, res) => {
  try {
    const { user } = req;

    const favorites = await favoriteService.listPostFavorite(user.id);
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
