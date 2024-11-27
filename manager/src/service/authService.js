import instance from "../config/instance";

const userLogin = (formData) => {
  return instance.post(`/auth/login`, formData);
};
export { userLogin };
