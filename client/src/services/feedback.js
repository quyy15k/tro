import axiosConfig from "../axiosConfig";

export const apiUserFeedbackPost = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        data: formData,
        method: "post",
        url: `/api/v1/feedback/create`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUserUpdateFeedbackPost = (formData, feedbackId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        data: formData,
        url: `/api/v1/feedback/update/${feedbackId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUserDeleteFeedbackPost = (formData, feedbackId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        data: formData,
        url: `/api/v1/feedback/delete/${feedbackId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllFeedbackPost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/feedback/list/${postId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
