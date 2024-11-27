import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function ContactInfo() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => setIsOpenModal(false);

  return (
    <>
      <div
        onClick={() => setIsOpenModal(!isOpenModal)}
        className="fixed right-8 bottom-8 w-16 h-16 bg-green-600 rounded-full flex flex-col justify-center items-center cursor-pointer hover:bg-green-800 transition-all duration-300 ease-in-out"
      >
        <FaQuestion color="white" size={20} />
        <span className="text-white text-center text-xs font-medium">Trợ giúp</span>
      </div>

      {isOpenModal ? (
        <div className="fixed inset-0 flex items-center top-10 justify-end right-4 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-80" onClick={closeModal}></div>

          <div className="relative bg-green-600 rounded-lg shadow-lg max-w-[600px] p-6 z-10">
            <button className="absolute top-2 right-2 text-black bg-white rounded-full p-1 hover:bg-slate-300 transition-all duration-300 ease-in-out" onClick={closeModal}>
              <IoMdClose size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Xin chào</h2>
              <p className="mb-4 text-white text-sm">
                Đội chăm sóc khách hàng Phongtro123.com. Chúng tôi muốn lắng nghe câu hỏi và ý kiến đóng góp từ bạn. Hãy phản hồi cho chúng tôi biết vấn đề của bạn nhé!
              </p>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <div className="bg-gray-100 p-4 rounded-lg text-center w-1/2">
                  <p className="font-semibold">Nhân viên hỗ trợ</p>
                  <p className="text-red-500 text-lg">Thanh Ly</p>
                  <p className="text-sm">Điện thoại: 0909316890</p>
                  <p className="text-sm">Zalo: 0909316890</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center flex-1 w-1/2">
                  <p className="font-semibold">Hỗ trợ thanh toán</p>
                  <p className="text-red-500 text-lg">Thanh Ly</p>
                  <p className="text-sm">Điện thoại: 0909316890</p>
                  <p className="text-sm">Zalo: 0909316890</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center w-1/2">
                  <p className="font-semibold">Phản ánh/ khiếu nại</p>
                  <p className="text-red-500 text-lg">Hotline</p>
                  <p className="text-sm">Điện thoại: 0917686101</p>
                  <p className="text-sm">Zalo: 0917686101</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ContactInfo;
