import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { ImOffice } from "react-icons/im";
import moment, { months } from "moment";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("0");
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, [updateData]);
  useEffect(() => {
    setPosts(postOfCurrent);
  }, [postOfCurrent]);
  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );
  const handDeletePost = async (postId) => {
    const response = await apiDeletePost(postId);
    if (response?.data.err === 0) {
      setUpdateData((prev) => !prev);
    } else {
      Swal.fire("Oops!", "Xoá thành công", "errer");
    }
  };
  useEffect(() => {
    if (status === 1) {
      const activePost = postOfCurrent?.filter((item) =>
        checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (status === 2) {
      const expirePost = postOfCurrent?.filter((item) =>
        checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(expirePost);
    } else {
      setPosts(postOfCurrent);
    }
  });
  return (
    <div className="flex flex-col gap-6 ">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          onChange={(e) => setStatus(+e.target.value)}
          value={status}
          className="outline-none border p-1 border-gray-200 rounded-md"
        >
          <option value="0">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="flex w-full">
            <th className="border flex-1 p-2">Mã tin</th>
            <th className="border flex-1 p-2">Ảnh đại diện</th>
            <th className="border flex-1 p-2">Tiêu đề </th>
            <th className="border flex-1 p-2">Giá</th>
            <th className="border flex-1 p-2">Số phòng trống</th>
            <th className="border flex-1 p-2">Ngày bắt đầu</th>
            <th className="border flex-1 p-2">Ngày hết hạn</th>
            <th className="border flex-1 p-2">Trạng thái</th>
            <th className="border flex-1 p-2">Tuỳ chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>
              <td>Không có dữ liệu</td>
            </tr>
          ) : (
            posts?.map((item) => {
              return (
                <tr className="flex items-center h-16" key={item.id}>
                  <td className="border px-2 flex-1 h-full flex justify-center items-center">
                    {item?.overviews?.code}
                  </td>
                  <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border px-2 flex-1 h-full flex justify-center items-center">{`${item?.title?.slice(
                    0,
                    40
                  )}...`}</td>
                  <td className="border px-2 flex-1 h-full flex justify-center items-center">
                    {item?.attributes?.price}
                  </td>
                  <td className="border px-2 flex-1 h-full flex justify-center items-center">
                    {item?.quantity}
                  </td>
                  <td className="border px-2 flex-1 h-full flex justify-center items-center">
                    {item?.overviews?.created}
                  </td>
                  <td className="border px-2 flex-1 h-full flex justify-center items-center">
                    {item?.overviews?.expired}
                  </td>
                  <td className="border px-2 flex-1 h-full flex justify-center items-center">
                    {checkStatus(item?.overviews?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="border px-2 flex-1 h-full flex items-center justify-center gap-4">
                    <Button
                      text="Sửa"
                      bgColor="bg-green-600"
                      textColor="text-white"
                      onClick={() => {
                        dispatch(actions.editData(item));
                        setIsEdit(true);
                      }}
                    />
                    <Button
                      text="Xoá"
                      bgColor="bg-red-600"
                      textColor="text-white"
                      onClick={() => handDeletePost(item.id)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-4xl h-auto p-8 overflow-auto rounded-md">
            <UpdatePost setIsEdit={setIsEdit} />{" "}
            {/* Truyền setIsEdit vào props */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePost;
