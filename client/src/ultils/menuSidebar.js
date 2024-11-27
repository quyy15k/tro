import { FaHistory } from "react-icons/fa";
import icons from "./icons";

const { TfiPencilAlt, MdOutlineEventNote, FaUserCircle } = icons;

const memuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <TfiPencilAlt />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <MdOutlineEventNote />,
  },
  {
    id: 4,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <FaUserCircle />,
  },
  {
    id: 5,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <FaUserCircle />,
  },
  {
    id: 6,
    text: "Lịch sử thanh toán",
    path: "/lich-su-thanh-toan",
    icon: <FaHistory />,
  },
];

export default memuSidebar;
