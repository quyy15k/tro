import instance from "../config/instance";

const getAllUser = () => {
  return instance.get(`/user/get-all-user`);
};
const updateUserInfo = (payload, id) => {
  return instance.put(`/user/admin-update-user/${id}`, payload);
};
const createUser = (payload) => {
  return instance.post(`/user/admin-create-user`, payload);
};
export { getAllUser, updateUserInfo, createUser };
