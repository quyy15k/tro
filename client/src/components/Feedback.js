import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Feedback = ({ feedbackData, onFeedbackSubmit }) => {
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleStarClick = (rating) => {
    setNewRating(rating);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = () => {
    if (newRating && newComment) {
      onFeedbackSubmit(newRating, newComment);
      setNewRating(0);  // Reset rating after submit
      setNewComment("");  // Reset comment
    } else {
      alert("Vui lòng đánh giá và nhập phản hồi!");
    }
  };

  return (
    <div className="p-6 mx-auto bg-white my-4 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Phản hồi và đánh giá</h2>
      {feedbackData.length ? (
        feedbackData.map((feedback) => (
          <div
            key={feedback.id}
            className="border border-gray-200 rounded-lg p-4 mb-4 shadow-lg relative"
          >
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white font-bold">
                {feedback.user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{feedback.user.name}</h3>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < feedback.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mt-2">{feedback.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Không có phản hồi nào</p>
      )}

    </div>
  );
};

export default Feedback;
