import React, { memo } from "react";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { path } from "../ultils/constant";
import icons from "../ultils/icons";

const indexs = [0, 1, 2, 3];
const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;

const Item = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
  favorite,
  hadRented = 0,
  handleUserFavorite,
  handleUserUnFavorite,
  quantity = 0,
}) => {
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" size={18} color="yellow" />);
    return stars;
  };
  return (
    <div className="w-full flex border-t border-orange-600 py-4">
      <div className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer overflow-hidden">
        {quantity > 0 ? (
          <span className="text-xs absolute top-0 left-0 bg-red-500 text-white font-bold px-2 py-1 transform z-10 rounded-br-md">
            Còn phòng
          </span>
        ) : (
          <span className="text-xs absolute top-0 left-0 bg-gray-500 text-white font-bold px-2 py-1 transform z-10 rounded-br-md">
            Hết phòng
          </span>
        )}

        <Link
          to={`${path.DETAIL}${formatVietnameseToString(
            title?.replaceAll("/", "")
          )}/${id}`}
          className="flex flex-wrap gap-[2px] items-center relative"
        >
          {images.length > 0 &&
            images
              .filter((i, index) => indexs.some((i) => i === index))
              ?.map((i, index) => {
                return (
                  <img
                    key={index}
                    src={i}
                    alt="preview"
                    className="w-[47%] h-[120px] object-cover"
                  />
                );
              })}
          <span className="bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4">{`${images.length} ảnh`}</span>
        </Link>
        <span className="text-white absolute right-5 bottom-1">
          {favorite > 0 ? (
            <button onClick={() => handleUserUnFavorite(id)}>
              <RiHeartFill size={26} color="red" />
            </button>
          ) : (
            <button onClick={() => handleUserFavorite(id)}>
              <RiHeartLine size={26} />
            </button>
          )}
        </span>
      </div>

      <div className="w-3/5">
        <div className="flex justify-between gap-4 w-full">
          <Link
            to={`${path.DETAIL}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className="text-red-600 font-medium"
          >
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            {title}
          </Link>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between gap-2">
          <span className="font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          {address?.length ? (
            <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">
              {`${address?.split(",")[address?.split(",")?.length - 2]}${
                address?.split(",")[address?.split(",")?.length - 1]
              }`}
            </span>
          ) : null}
        </div>
        <span className="text-gray-700 text-xs ml-auto">
          {attributes?.published}
        </span>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center my-5 justify-between">
          <div className="flex items-center">
            <img
              src="https://img.thuthuatphanmem.vn/uploads/2018/09/22/avatar-trang-den-dep_015640236.png"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`tel:${user?.phone}`}
              className="bg-blue-700 text-white p-1 rounded-md"
            >
              {`Gọi ${user?.phone}`}
            </a>
            <a
              href={`http://zalo.me/${user?.zalo}`}
              className="text-blue-700 px-1 rounded-md border border-blue-700"
            >
              Nhắn zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
