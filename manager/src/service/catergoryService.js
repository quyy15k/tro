import instance from "../config/instance";

const getAllCategory = () => {
  return instance.get(`/category/all`);
};
const deleteCategory = (id) => {
  return instance.delete(`/category/delete/${id}`);
};
const updateCategory = (id, payload) => {
  return instance.put(`/category/update/${id}`, payload);
};
const createCategory = (payload) => {
  return instance.put(`/category/create`, payload);
};
export { getAllCategory, deleteCategory, updateCategory, createCategory };
