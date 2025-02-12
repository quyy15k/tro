import * as postService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  const { user } = req;

  try {
    const response = await postService.getPostsLimitService(
      page,
      { ...query, userId: user ? user.id : undefined },
      { priceNumber, areaNumber }
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const createNewPosts = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label, ...payload } =
      req.body;
    const { id } = req.user;
    if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label)
      return res.status(400).json({
        err: 1,
        msg: "missing inputs",
      });

    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error at createNewPosts: ", error);
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getPostsLimitAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs" + err,
      });
    const response = await postService.getPostsLimitAdminService(
      page,
      id,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const updatePost = async (req, res) => {
  const { postId, overviewId, imagesId, attributesId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id || !overviewId || !imagesId || !attributesId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs" + err,
      });
    const response = await postService.updatePost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const updateStatusPost = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await postService.updateStatusPost(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;
  try {
    if (!postId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs" + err,
      });
    const response = await postService.deletePost(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
