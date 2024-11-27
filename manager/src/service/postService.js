import instance from "../config/instance";

const getAllPost = () => {
  return instance.get(`/post/all`);
};
const updatePostStatus = (payload, id) => {
  return instance.put(`/post/status/${id}`, payload);
};

export { getAllPost, updatePostStatus };
