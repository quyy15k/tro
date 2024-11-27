import React, { useEffect, useState } from "react";
import { Button, Item } from "../../components";
import { getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  apiUserFavoritePost,
  apiUserUnFavoritePost,
} from "../../services/favorite";
import { toast } from "react-toastify";

const List = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [sort, setSort] = useState(0); // 0: mặc định, 1: mới nhất

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });

    if (categoryCode) searchParamsObject.categoryCode = categoryCode;

    // Thêm logic để sắp xếp
    if (sort === 1) {
      searchParamsObject.order = ["createdAt", "DESC"]; // Mới nhất
    } else if (sort === 2) {
      searchParamsObject.order = ["viewed", "DESC"];
    } else {
      delete searchParamsObject.order; // Xóa order nếu không sắp xếp
    }

    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, categoryCode, sort]); // Thêm sort vào dependency array

  const handleUserFavorite = async (id) => {
    if (!isLoggedIn) {
      toast.info("Vui lòng đăng nhập để sử dụng tính năng yêu thích");
      return;
    }
    const res = await apiUserFavoritePost(id);
    if (res.data.err === 0) {
      dispatch(getPostsLimit());
    }
  };

  const handleUserUnFavorite = async (id) => {
    if (!isLoggedIn) {
      toast.info("Vui lòng đăng nhập để sử dụng tính năng yêu thích");
      return;
    }
    const res = await apiUserUnFavoritePost(id);
    if (res.data.err === 0) {
      dispatch(getPostsLimit());
    }
  };

  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật: 12:05 25/08/2024</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp:</span>
        <span
          onClick={() => setSort(0)}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 0 && "text-orange-500"
          }`}
        >
          Mặc định
        </span>
        <span
          onClick={() => setSort(1)}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 1 && "text-orange-500"
          }`}
        >
          Mới nhất
        </span>
        <span
          onClick={() => {
            if (isLoggedIn) {
              setSort(2);
            } else {
              toast.info("Đăng nhập để sử dụng tính năng này");
            }
          }}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 2 && "text-orange-500"
          }`}
        >
          Đã xem gần đây
        </span>
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
                favorite={item?.favorite}
                hadRented={item?.hadRented}
                quantity={item?.quantity}
                handleUserFavorite={handleUserFavorite}
                handleUserUnFavorite={handleUserUnFavorite}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
