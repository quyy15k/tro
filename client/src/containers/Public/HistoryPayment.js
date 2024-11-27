import React, { useEffect, useRef, useState } from "react";
import { FcFeedback } from "react-icons/fc";
import { PiPrinter } from "react-icons/pi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ItemSidebar, Province, RelatedPost } from "../../components";
import ContactInfo from "../../components/ContactInfo";
import Item from "../../components/Item";
import {
  apiUserFavoritePost,
  apiUserUnFavoritePost,
} from "../../services/favorite";
import { apiUserFeedbackPost } from "../../services/feedback";
import { apiGetAllUserHistory } from "../../services/history";
import { text } from "../../ultils/constant";

const HistoryPayment = () => {
  const [data, setData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const printRef = useRef();
  const fetchAllHistories = async () => {
    const res = await apiGetAllUserHistory();
    setData(res.data);
  };
  useEffect(() => {
    fetchAllHistories();
  }, []);

  const handlePrintClick = (item) => {
    setSelectedBill(item);
    handlePrintBill(item);
  };

  const handlePrintBill = (item) => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h3 style="font-size: 1.5em; font-weight: bold;">Thông Tin Hóa Đơn</h3>
        <p><strong>Tên khách hàng:</strong> ${item.user.name}</p>
        <p><strong>Số điện thoại:</strong> ${item.user.phone}</p>
        <p><strong>Ngày thanh toán:</strong> ${new Date(
      item.paymentDate
    ).toLocaleString()}</p>
        <p><strong>Số tiền:</strong> ${Number(
      item.totalAmount
    ).toLocaleString()} VND</p>
        <p><strong>Chủ thuê:</strong> ${item.post.user.name}</p>
        <p><strong>Liên hệ:</strong> ${item.post.user.phone}</p>
      </div>
    `;

    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>In Hóa Đơn</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h3 { font-size: 1.5em; font-weight: bold; }
            p { margin: 8px 0; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  };
  const handleFeedback = (item) => {
    setSelectedFeedback(item);
    setFeedbackModalVisible(true);
  };

  const handleFeedbackSubmit = async () => {
    try {
      const res = await apiUserFeedbackPost({
        postId: selectedFeedback.post.id,
        rating: feedbackRating,
        comment: feedbackComment,
      });
      if (res.data) {
        toast.success("Đánh giá thành công!");
      }
    } catch (error) { }
    setFeedbackModalVisible(false);
    setFeedbackRating(0);
    setFeedbackComment("");
  };

  const handleRatingClick = (rating) => {
    setFeedbackRating(rating);
  };
  const handleUserFavorite = async (id) => {
    const res = await apiUserFavoritePost(id);
    if (res.data.err === 0) {
      fetchAllHistories();
    }
  };
  const handleUserUnFavorite = async (id) => {
    const res = await apiUserUnFavoritePost(id);
    if (res.data.err === 0) {
      fetchAllHistories();
    }
  };
  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Lịch Sử Thanh Toán
            </h2>
            {data.length ? (
              data.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 mb-4 shadow-lg"
                >
                  <div>
                    <div className="relative">
                      <div className="absolute right-2 top-2 cursor-pointer flex items-center gap-2">
                        <button onClick={() => handleFeedback(item)}>
                          <FcFeedback size={30} color="black" />
                        </button>
                        <button onClick={() => handlePrintClick(item)}>
                          <PiPrinter size={30} color="green" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">
                      Tên khách hàng: {item.user.name}
                    </h3>
                    <p className="text-gray-500">
                      Số điện thoại: {item.user.phone}
                    </p>
                  </div>
                  <div className="mb-2">
                    <strong>Ngày thanh toán:</strong>{" "}
                    {new Date(item.paymentDate).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <strong>Số tiền:</strong>{" "}
                    {Number(item.totalAmount).toLocaleString()} VND
                  </div>
                  <div>
                    <Item
                      address={item?.post?.address}
                      attributes={item?.post?.attributes}
                      description={JSON.parse(item?.post?.description)}
                      images={JSON.parse(item?.post?.images?.image)}
                      star={+item?.post?.star}
                      title={item?.post?.title}
                      user={item?.post?.user}
                      id={item?.post?.id}
                      favorite={item?.post?.favorite}
                      hadRented={item?.post?.hadRented}
                      quantity={item?.post?.quantity}
                      handleUserFavorite={handleUserFavorite}
                      handleUserUnFavorite={handleUserUnFavorite}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Không có dữ liệu lịch sử thanh toán
              </p>
            )}
            {selectedBill && (
              <div
                ref={printRef}
                className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg hidden"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Thông Tin Hóa Đơn
                </h3>
                <p>
                  <strong>Tên khách hàng:</strong> {selectedBill.user.name}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {selectedBill.user.phone}
                </p>
                <p>
                  <strong>Ngày thanh toán:</strong>{" "}
                  {new Date(selectedBill.paymentDate).toLocaleString()}
                </p>
                <p>
                  <strong>Số tiền:</strong>{" "}
                  {Number(selectedBill.totalAmount).toLocaleString()} VND
                </p>
                <p>
                  <strong>Chủ thuê:</strong> {selectedBill.post.user.name}
                </p>
                <p>
                  <strong>Liên hệ:</strong> {selectedBill.post.user.phone}
                </p>
              </div>
            )}
            {isFeedbackModalVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
                  <h3 className="text-xl font-semibold mb-4">
                    Đánh Giá và Phản Hồi
                  </h3>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer text-3xl ${star <= feedbackRating
                            ? "text-yellow-400"
                            : "text-gray-300"
                          }`}
                        onClick={() => handleRatingClick(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="w-full p-2 border rounded-lg resize-none"
                    rows="4"
                    maxLength="500"
                    placeholder="Nhập phản hồi của bạn (tối đa 500 ký tự)"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {feedbackComment.length} / 500
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-lg"
                      onClick={() => setFeedbackModalVisible(false)}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={handleFeedbackSubmit}
                    >
                      Gửi Phản Hồi
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <RelatedPost newPost />
        </div>
      </div>
      <ContactInfo />
    </div>
  );
};

export default HistoryPayment;
