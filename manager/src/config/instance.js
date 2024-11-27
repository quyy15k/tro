import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
});

instance.interceptors.request.use(
  function (config) {
    let token = Cookies.get("token");
    config.headers = {
      authorization: token ? `Bearer ${token}` : null,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
