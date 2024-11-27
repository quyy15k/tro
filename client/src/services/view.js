import axiosConfig from "../axiosConfig";

export const apiCreateViewed = (formĐata) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        data: formĐata,
        url: "/api/v1/view/create-post_view",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllViewd = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/view/list-post_view",
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
