import React, { memo, useEffect, useState } from "react";
import { getNumbersArea, getNumbersPrice } from "../ultils/Common/getNumbers";
import icons from "../ultils/icons";

const { GrLinkPrevious } = icons;

const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const [persent1, setPersent1] = useState(() => {
    if (name === "price" && arrMinMax?.priceArr) {
      return arrMinMax.priceArr[0];
    }
    if (name === "area" && arrMinMax?.areaArr) {
      return arrMinMax.areaArr[0];
    }
    return 0;
  });
  const [persent2, setPersent2] = useState(() => {
    if (name === "price" && arrMinMax?.priceArr) {
      return arrMinMax.priceArr[1];
    }
    if (name === "area" && arrMinMax?.areaArr) {
      return arrMinMax.areaArr[1];
    }
    return 100;
  });
  const [activedEl, setActivedEl] = useState("");

  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      activedTrackEl.style.left = `${Math.min(persent1, persent2)}%`;
      activedTrackEl.style.right = `${100 - Math.max(persent1, persent2)}%`;
    }
  }, [persent1, persent2]);

  const handleClickTrack = (e, value) => {
    const stackEl = document.getElementById("track");
    const stackRect = stackEl.getBoundingClientRect();
    const percent =
      value ||
      Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width);
    if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
      setPersent1(percent);
    } else {
      setPersent2(percent);
    }
  };

  const convert100toTarget = (percent) => {
    return name === "price"
      ? (Math.ceil((percent * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil((percent * 0.9) / 5) * 5
      : 0;
  };

  const convertto100 = (percent) => {
    const target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    setActivedEl(code);
    const arrMaxMin =
      name === "price" ? getNumbersPrice(value) : getNumbersArea(value);

    if (arrMaxMin.length === 1) {
      setPersent1(arrMaxMin[0] === 1 ? 0 : 100);
      setPersent2(convertto100(arrMaxMin[0]));
    } else if (arrMaxMin.length === 2) {
      setPersent1(convertto100(arrMaxMin[0]));
      setPersent2(convertto100(arrMaxMin[1]));
    }
  };

  const handleBeforeSubmit = (e) => {
    const min = Math.min(persent1, persent2);
    const max = Math.max(persent1, persent2);
    const arrMinMax =
      persent1 === persent2 && persent1 === 100
        ? [convert100toTarget(min), 99999]
        : [convert100toTarget(min), convert100toTarget(max)];

    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)}${
          persent1 === persent2 && persent1 === 100
            ? ""
            : ` - ${convert100toTarget(max)} ${
                name === "price" ? "triệu" : "m2"
              }`
        }`,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

  return (
    <div
      onClick={() => setIsShowModal(false)}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-2/5 h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
          <span
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col">
            <span className="py-2 flex gap-2 items-center border-b border-gray-200">
              <input
                type="radio"
                name={name}
                value={defaultText || ""}
                id="default"
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) =>
              item.code ? (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onChange={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              ) : null
            )}
          </div>
        )}
        {(name === "price" || name === "area") && (
          <div className="p-12 py-20">
            <div className="flex flex-col items-center justify-center relative">
              <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600">
                {persent1 === 100 && persent2 === 100
                  ? `Trên ${convert100toTarget(persent1)} ${
                      name === "price" ? "triệu" : "m2"
                    } +`
                  : `Từ ${Math.min(
                      convert100toTarget(persent1),
                      convert100toTarget(persent2)
                    )} - ${Math.max(
                      convert100toTarget(persent1),
                      convert100toTarget(persent2)
                    )} ${name === "price" ? "triệu" : "m2"}`}
              </div>
              <div
                onClick={handleClickTrack}
                id="track"
                className="slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full"
              ></div>
              <div
                onClick={handleClickTrack}
                id="track-active"
                className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full"
              ></div>
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                value={persent1}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPersent1(+e.target.value);
                  activedEl && setActivedEl("");
                }}
              />
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                value={persent2}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPersent2(+e.target.value);
                  activedEl && setActivedEl("");
                }}
              />
              <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="mr-[-12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 100);
                  }}
                >
                  {name === "price"
                    ? "15 triệu +"
                    : name === "area"
                    ? "Trên 90 m2"
                    : ""}
                </span>
              </div>
            </div>
            <div className="mt-24">
              <h4 className="font-medium mb-4">Chọn nhanh:</h4>
              <div className="flex gap-2 items-center flex-wrap w-full">
                {content?.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => handleActive(item.code, item.value)}
                    className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${
                      item.code === activedEl ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {(name === "price" || name === "area") && (
          <button
            type="button"
            className="w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md"
            onClick={handleBeforeSubmit}
          >
            ÁP DỤNG
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
