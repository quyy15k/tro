import actionTypes from "./actionTypes";
import {
  apiGetNewPosts,
  apiGetPosts,
  apiGetPostsLimit,
  apiGetPostsLimitAdmin,
} from "../../services/post";
import { apiGetAllViewd } from "../../services/view";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      posts: null,
    });
  }
};
export const getPostsLimit = (query) => async (dispatch) => {
  try {
    let response;
    if (query && query?.order?.length && query.order[0] === "viewed") {
      const ALlViewd = await apiGetAllViewd(query);
      if (ALlViewd.data?.err === 0) {
        const posts = ALlViewd.data?.response?.rows.map((data) => data.post);
        response = {
          data: {
            ...ALlViewd.data,
            response: { ...ALlViewd.data.response, rows: posts },
          },
        };
      }
      console.log("post", response);
    } else response = await apiGetPostsLimit(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};
export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await apiGetNewPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POST,
      newPosts: null,
    });
  }
};
export const getOutstandingPost = () => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit({
      limitPost: 5,
      order: ["star", "DESC"],
    });
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        outStandingPost: response.data.response.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        msg: response.data.msg,
        outStandingPost: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_OUTSTANDING,
      outStandingPost: null,
    });
  }
};

export const getPostsLimitAdmin = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimitAdmin(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        msg: response.data.msg,
        posts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_ADMIN,
      posts: null,
    });
  }
};
export const editData = (dataEdit) => ({
  type: actionTypes.EDIT_DATA,
  dataEdit,
});
