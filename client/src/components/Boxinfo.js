import React, { memo, useState } from "react";
import { FaHeart, FaMoneyCheck } from "react-icons/fa";
import anonAvatar from "../assets/anon-avatar.png";
import icons from "../ultils/icons";

const { GoDotFill, FaPhone, SiZalo, PiHeartStraight } = icons;

const Boxinfo = ({
  useData: { name, phone, zalo, id },
  handleShowModalStripe,
  hadRented = 0,
  favorite = 0,
  handleUserFavorite,
  handleUserUnFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-2">
      <img
        src={anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl">{name}</h3>
      <span className="flex items-center gap-2">
        <GoDotFill color="green" />
        <span>Đang hoạt động</span>
      </span>
      <a
        className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg "
        href="/"
      >
        <FaPhone />
        {phone}
      </a>
      <a
        className="bg-[#ffffff] py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg border border-black"
        href={`http://zalo.me/${zalo}`}
      >
        <SiZalo
          className="bg-blue-500 rounded-full p-1 flex items-center justify-center"
          size={35}
          color="white"
        />
        {"Nhắn zalo"}
      </a>
      <button
        onClick={handleToggleFavorite}
        className={`bg-[#ffffff] py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg border border-black ${
          favorite === 1 ? "text-red-500" : ""
        }`}
      >
        {favorite === 1 ? (
          <button
            onClick={handleUserUnFavorite}
            className="flex items-center gap-2"
          >
            <FaHeart size={35} /> {"Đã thích"}
          </button>
        ) : (
          <button
            onClick={handleUserFavorite}
            className="flex items-center gap-2"
          >
            <PiHeartStraight size={35} /> {"Yêu thích"}
          </button>
        )}
      </button>
      <button
        disabled={hadRented === 1}
        onClick={() => handleShowModalStripe()}
        className={`bg-[#ffffff] py-2 disabled:bg-gray-500 disabled:text-slate-300 disabled:select-none disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg border border-black`}
      >
        <FaMoneyCheck size={35} /> {"Thuê ngay"}
      </button>
    </div>
  );
};

export default memo(Boxinfo);
