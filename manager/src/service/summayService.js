import instance from "../config/instance";

const getOverview = () => {
  return instance.get(`/summary/overview`);
};
const getUserSummay = () => {
  return instance.get(`/summary/user-summay`);
};
const getPostSummay = () => {
  return instance.get(`/summary/post-summay`);
};
const createPrice = (payload) => {
  return instance.put(`/price/create`, payload);
};
export { getOverview, getUserSummay, getPostSummay, createPrice };
