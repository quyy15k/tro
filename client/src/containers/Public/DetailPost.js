import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Boxinfo, RelatedPost, Slider } from "../../components";
import StripeModal from "../../components/StripeModal";
import { getPostsLimit } from "../../store/actions";
import icons from "../../ultils/icons";
import { apiGetAllFeedbackPost } from "../../services/feedback";
import Feedback from "../../components/Feedback";
import {
  apiUserFavoritePost,
  apiUserUnFavoritePost,
} from "../../services/favorite";
import { toast } from "react-toastify";
import { apiCreateViewed } from "../../services/view";

const { FaMapMarkerAlt, TbReportMoney, RiCrop2Line, FaStopwatch, FaHashtag } =
  icons;
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [isShowModalStripe, setIsShowModalStripe] = useState(false);
  const [feedBack, setFeedback] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const fetchFeedback = async (postId) => {
    const res = await apiGetAllFeedbackPost(postId);
    if (res?.data) {
      setFeedback(res.data);
    }
  };
  useEffect(() => {
    if (postId && isLoggedIn) apiCreateViewed({ postId: postId });
  }, []);
  useEffect(() => {
    if (postId) {
      dispatch(getPostsLimit({ id: postId }));
      fetchFeedback(postId);
    }
  }, [postId, dispatch]);
  const handleUserFavorite = async () => {
    if (!isLoggedIn) {
      toast.info("Vui lòng đăng nhập để sử dụng tính năng yêu thích");
      return;
    }
    const res = await apiUserFavoritePost(postId);
    if (res.data.err === 0) {
      dispatch(getPostsLimit({ id: postId }));
    }
  };
  const handleUserUnFavorite = async () => {
    if (!isLoggedIn) {
      toast.info("Vui lòng đăng nhập để sử dụng tính năng yêu thích");
      return;
    }
    const res = await apiUserUnFavoritePost(postId);
    if (res.data.err === 0) {
      dispatch(getPostsLimit({ id: postId }));
    }
  };
  if (!posts.length) {
    return <div>Loading...</div>;
  }

  const post = posts[0];
  const handleShowModalStripe = () => {
    if (!isLoggedIn) {
      toast.info("Vui lòng đăng nhập để sử dụng tính năng thanh toán");
      return;
    }
    setIsShowModalStripe(!isShowModalStripe);
  };
  function extractPrice(priceString) {
    const match = priceString.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0] * 1000000) : null;
  }

  return (
    <div className="w-full flex gap-3">
      <div className="w-[70%]">
        <Slider
          images={post.images?.image ? JSON.parse(post.images.image) : []}
        />
        <div className="flex flex-col gap-2 bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-bold text-red-600">{`${post.title} - ${post.quantity < 1 ? "Hết phòng" : "Còn phòng"
            }`}</h2>
          <div className="flex items-center gap-2">
            <span>Chuyên mục:</span>
            <span className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer">
              {post.overviews?.area}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt color="2563EB" />
            <span>{post.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TbReportMoney color="16A34A" />
              <span className="font-semibold text-lg text-green-600">
                {post.attributes?.price}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <RiCrop2Line />
              <span>{post.attributes?.acreage}</span>
            </span>
            <span className="flex items-center gap-2">
              <FaStopwatch />
              <span>{post.attributes?.published}</span>
            </span>
            <span className="flex items-center gap-2">
              <FaHashtag />
              <span>{post.attributes?.hashtag}</span>
            </span>
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-xl mb-4 border-b pb-2">Thông tin mô tả</h3>
            <div className="flex flex-col gap-3 text-gray-700 leading-relaxed">
              {post.description && Array.isArray(JSON.parse(post.description)) ? (JSON.parse(post.description).map((item, index) => (
                  <p key={index} className="text-justify">
                    {item}
                  </p>
                ))
              ) : post.description ? (
                <p className="text-justify">{JSON.parse(post.description)}</p>
              ) : (
                <p className="text-gray-500 italic">Không có thông tin mô tả.</p>
              )}
            </div>
          </div>

          <div className="mt-2">
            <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody>
                <tr className="w-full bg-gray-200">
                  <td className="p-3">Mã tin</td>
                  <td className="p-3">{post.overviews?.code}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-3">Khu vực</td>
                  <td className="p-3">{post.overviews?.area}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-3">Loại tin rao</td>
                  <td className="p-3">{post.overviews?.type}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-3">Đối tượng</td>
                  <td className="p-3">{post.overviews?.target}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-3">Gói tin</td>
                  <td className="p-3">{post.overviews?.bonus}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-3">Ngày đăng</td>
                  <td className="p-3">{post.overviews?.created}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-3">Ngày hết hạn</td>
                  <td className="p-3">{post.overviews?.expired}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-3">Số phòng trống</td>
                  <td className="p-3">{post.quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
            <table className="w-full">
              <tbody>
                <tr className="w-full">
                  <td className="p-3">Liên hệ:</td>
                  <td className="p-3">{post.user?.name}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-3">Số điện thoại:</td>
                  <td className="p-3">{post.user?.phone}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-3">Zalo:</td>
                  <td className="p-3">{post.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {feedBack?.length ? <Feedback feedbackData={feedBack} /> : null}
      </div>
      <div className="w-[30%] flex flex-col gap-8">
        <Boxinfo
          useData={post.user}
          hadRented={post.hadRented}
          handleShowModalStripe={handleShowModalStripe}
          favorite={post?.favorite}
          handleUserFavorite={handleUserFavorite}
          handleUserUnFavorite={handleUserUnFavorite}
        />
        <RelatedPost />
        <RelatedPost newPost />
      </div>
      {isShowModalStripe && (
        <Elements stripe={stripePromise}>
          <StripeModal
            loading={loading}
            setLoading={setLoading}
            error={error}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            handleCloseModal={handleShowModalStripe}
            amount={extractPrice(post?.attributes?.price)}
            postId={postId}
          />
        </Elements>
      )}
    </div>
  );
};

export default DetailPost;
