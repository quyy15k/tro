import * as postViewService from "../services/post_view";

export const createNewPostView = async (req, res) => {
  const { postId } = req.body;
  try {
    const response = await postViewService.createPost_view({
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

export const getALlPostView = async (req, res) => {
  try {
    const { page, limitPost } = req.query;
    const { user } = req;
    const histories = await postViewService.getALlPostView(page, {
      limitPost: limitPost,
      userId: user ? user.id : undefined,
    });
    return res.status(200).json(histories);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
