import { useEffect, useState } from "react";
import {
  getOverview,
  getPostSummay,
  getUserSummay,
} from "../service/summayService";
import OverviewBox from "../components/OverviewBox/OverviewBox";
import { BiUser } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import UserChart from "../components/UserChart/UserChart";
import PostChart from "../components/PostChart/PostChart";

function Dashboard() {
  const [overviewData, setOverviewData] = useState({
    postCount: 0,
    userCount: 0,
  });
  const [userSummary, setUserSummary] = useState({});
  const [postSummary, setPostSummary] = useState({});

  const fetchOverView = async () => {
    const res = await getOverview();
    if (res.data.err === 0) {
      setOverviewData(res.data.response);
    }
  };
  const fetchUserSummary = async () => {
    const res = await getUserSummay();
    if (res.data.err === 0) {
      setUserSummary(res.data.response);
    }
  };
  const fetchPostSummary = async () => {
    const res = await getPostSummay();
    if (res.data.err === 0) {
      setPostSummary(res.data.response);
    }
  };

  useEffect(() => {
    fetchOverView();
    fetchUserSummary();
    fetchPostSummary();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center w-[80%] m-auto gap-3">
        <OverviewBox
          count={overviewData.postCount}
          title="Tổng số Bài viết"
          icon={<IoNewspaperOutline color="white" size={60} />}
          bg="bg-orange-500"
        />

        <OverviewBox
          count={overviewData.userCount}
          title="Tổng số Người dùng"
          icon={<BiUser color="white" size={60} />}
          bg="bg-green-500"
        />
      </div>
      <UserChart chartData={userSummary} />
      <PostChart chartData={postSummary} />
    </div>
  );
}

export default Dashboard;
