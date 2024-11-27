import axios from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/user/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCreateSearchHistory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/search/create-user-search",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetHistpryUserSearch = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/search/list-search-history",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetTopSearch = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/search/top-search",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDelteSearchHistory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "delete",
        data: data,
        url: "/api/v1/search/delete-search-history",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
