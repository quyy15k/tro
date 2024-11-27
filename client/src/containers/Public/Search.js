import React, { useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { GrNew, GrPowerReset } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Modal, SearchItem } from "../../components";
import {
  apiCreateSearchHistory,
  apiDelteSearchHistory,
  apiGetHistpryUserSearch,
  apiGetTopSearch,
} from "../../services";
import { path } from "../../ultils/constant";
import icons from "../../ultils/icons";
import { PiRanking } from "react-icons/pi";
import { FaRankingStar } from "react-icons/fa6";

const {
  BsChevronRight,
  HiOutlineLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouseSiding,
  FiSearch,
} = icons;

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});
  const [defaultText, setDefaultText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [histories, setHistories] = useState([]);
  const [topSearch, setTopSearch] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const fetchHistoryData = async () => {
    if (isLoggedIn) {
      try {
        const res = await apiGetHistpryUserSearch();
        if (res?.data?.err === 0) {
          setHistories(res.data?.response);
        }
      } catch (error) { }
    }
    const resTopSeearch = await apiGetTopSearch();
    if (resTopSeearch?.data?.err === 0) {
      setTopSearch(resTopSeearch.data?.response);
    }
  };
  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
    fetchHistoryData();
  }, [location]);

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };
  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
      arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isShowModal, queries]
  );
  const handleSearch = async () => {
    setIsHistoryVisible(false);
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleSearch = `${queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
      } ${queryTextObj.province ? `tỉnh ${queryTextObj.province}` : ""} ${queryTextObj.price ? `giá ${queryTextObj.price}` : ""
      } ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ""} `;
    if (searchText.trim() !== "") {
      queryCodesObj.searchText = searchText;
      if (isLoggedIn) await apiCreateSearchHistory({ searchText: searchText });
    }

    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ ...queryCodesObj }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  const handleReset = () => {
    setQueries({});
    setSearchText("");
    setArrMinMax({});
    navigate(
      {
        pathname: path.SEARCH,
      },
      { state: { titleSearch: "Tìm kiếm mặc định" } }
    );
  };
  const handleDeleteSarchHistory = async (history) => {
    const res = await apiDelteSearchHistory({ id: history.id });
    if (res?.data?.err === 0) {
      await fetchHistoryData();
    }
  };
  return (
    <div className="bg-white p-10 mt-6 shadow-md rounded-md w-4/5 lg:w-3/5">
      <div className="flex flex-col gap-4  bg-slate-500 bg-opacity-60 shadow-lg rounded-lg px-4 py-6">
        <div className="flex justify-between items-center bg-white rounded-tl-lg rounded-bl-lg rounded-tr-lg rounded-br-lg relative">
          <BsSearch className="ml-3" />
          <input
            className="flex-1 rounded-sm ml-2 px-2 py-1 outline-none border-l"
            placeholder="Nhập tên phòng trọ, nhà, mặt bằng"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsHistoryVisible(true)}
            type="search"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="outline-none py-2 px-4  bg-red-500 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium  rounded-tr-lg rounded-br-lg"
          >
            <FiSearch />
            Tìm kiếm
          </button>
          {isHistoryVisible ? (
            <div className="absolute inset-0 top-10 bg-white shadow-lg min-h-60 overflow-y-auto border p-4 rounded-sm z-20">
              {histories.length ? (
                <div className="flex items-center gap-2 mb-4">
                  <FaHistory />
                  <span>Lịch sử tìm kiếm trước đó</span>
                </div>
              ) : null}
              <div className="grid grid-cols-2 gap-4">
                {histories?.map((history, index) => (
                  <div
                    onClick={() => setSearchText(history.searchText)}
                    className={`flex items-center gap-2 hover:underline hover:cursor-pointer ${index % 2 === 0 ? "border-r mr-2" : null
                      }`}
                    key={history.id}
                  >
                    <IoIosCloseCircleOutline
                      onClick={() => handleDeleteSarchHistory(history)}
                      size={20}
                      color="red"
                      className="cursor-pointer"
                    />
                    <span className="text-gray-500 text-sm text-start line-clamp-1">
                      {history.searchText}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border my-4" />
              <div className="flex items-center gap-2 mb-4">
                <PiRanking />
                <span>Top tìm kiếm</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {topSearch?.map((history, index) => (
                  <div
                    onClick={() => setSearchText(history.searchText)}
                    className={`flex items-center gap-2 hover:underline hover:cursor-pointer ${index % 2 === 0 ? "border-r mr-2" : null
                      }`}
                    key={index}
                  >
                    <FaRankingStar size={20} className="cursor-pointer" />
                    <span className="text-gray-500 text-sm text-start line-clamp-1">
                      {history.searchText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        {isHistoryVisible ? (
          <div
            className="absolute bg-transparent top-0 right-0 left-0 bottom-0 z-10"
            onClick={() => setIsHistoryVisible(false)}
          />
        ) : null}
        <div className="my-1 flex-col lg:flex-row flex items-center justify-around gap-2">
          <span
            onClick={() =>
              handleShowModal(categories, "category", "Tìm tất cả")
            }
            className="cursor-pointer flex-1"
          >
            <SearchItem
              IconBefore={<MdOutlineHouseSiding />}
              fontWeight
              IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
              text={queries.category}
              defaultText={"Tìm tất cả"}
            />
          </span>
          <span
            onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
            className="cursor-pointer flex-1"
          >
            <SearchItem
              IconBefore={<HiOutlineLocationMarker />}
              IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
              text={queries.province}
              defaultText={"Toàn quốc"}
            />
          </span>
          <span
            onClick={() => handleShowModal(prices, "price", "Chọn giá")}
            className="cursor-pointer flex-1"
          >
            <SearchItem
              IconBefore={<TbReportMoney />}
              IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
              text={queries.price}
              defaultText={"Chọn giá"}
            />
          </span>
          <span
            onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
            className="cursor-pointer flex-1"
          >
            <SearchItem
              IconBefore={<RiCrop2Line />}
              IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
              text={queries.area}
              defaultText={"Chọn diện tích"}
            />
          </span>
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-md outline-none py-2 px-4 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium"
          >
            <FiFilter />
            Lọc
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md outline-none py-2 px-4 min-w-28 flex-1 bg-red-500 text-[13.3px] flex items-center justify-center gap-1 text-white font-medium"
          >
            <GrPowerReset />
            Làm mới
          </button>
        </div>
      </div>
      {isShowModal && (
        <Modal
          handleSubmit={handleSubmit}
          queries={queries}
          arrMinMax={arrMinMax}
          content={content}
          name={name}
          setIsShowModal={setIsShowModal}
          defaultText={defaultText}
        />
      )}
    </div>
  );
};

export default Search;