import axiosConfig from "../axiosConfig";

export const apiUserFavoritePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/favorite/add/${postId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUserUnFavoritePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/favorite/remove/${postId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUserGetAllFavoritePost = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/favorite/post`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
