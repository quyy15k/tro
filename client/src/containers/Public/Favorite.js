import React, { useEffect, useState } from "react";
import { Item } from "../../components"; // Đảm bảo import Item
import { RelatedPost } from "../../components"; // Import RelatedPost
import {
  apiUserGetAllFavoritePost,
  apiUserUnFavoritePost,
} from "../../services/favorite";

const Favorite = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchAllFavorite = async () => {
      const res = await apiUserGetAllFavoritePost();
      setListData(res?.data || []);
    };
    fetchAllFavorite();
  }, []);

  const handleUserUnFavorite = async (id) => {
    const res = await apiUserUnFavoritePost(id);
    if (res.data.err === 0) {
      setListData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Danh sách yêu thích
      </h1>
      {listData.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Chưa có bài đăng nào yêu thích.
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {listData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-all duration-300"
              >
                <Item
                  address={item.address}
                  description={JSON.parse(item.description)}
                  images={JSON.parse(item.images?.image)}
                  star={item.star}
                  title={item.title}
                  user={item.user}
                  id={item.id}
                  favorite={item.favorite}
                  hadRented={item.hadRented}
                  attributes={item.attributes}
                  quantity={item.quantity}
                  handleUserUnFavorite={handleUserUnFavorite}
                />
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/3">
            <RelatedPost />
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
