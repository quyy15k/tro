import db from "../models";

export const createFeedback = async ({ userId, postId, rating, comment }) => {
  // check if user paied tentancy ??
  const history = await db.History.findOne({
    where: { userId, postId },
  });
  if (!history)
    new Error("User must have an active rental to create feedback.");

  const feedback = await db.Feedback.create({
    userId,
    postId,
    rating,
    comment,
  });
  return feedback;
};

export const updateFeedback = async ({
  feedbackId,
  userId,
  rating,
  comment,
}) => {
  // check feedback exitsing
  const feedback = await db.Feedback.findOne({
    where: { id: feedbackId },
  });
  if (!feedback) new Error("Not found feedback.");
  if (feedback.userId !== userId) new Error("Feedback not belong to user.");

  feedback.rating = rating;
  feedback.comment = comment;
  await feedback.save();

  return feedback;
};

export const deleteFeedback = async ({ feedbackId, userId }) => {
  // check feedback exitsing
  const feedback = await db.Feedback.findOne({
    where: { id: feedbackId },
  });
  if (!feedback) new Error("Not found feedback.");
  if (feedback.userId !== userId) new Error("Feedback not belong to user.");

  await feedback.destroy();
};

export const listFeedbackByPostId = async ({ postId }) => {
  return await db.Feedback.findAll({
    where: { postId },
    attributes: { exclude: ["userId", "postId"] },
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["id", "name", "avatar"],
      },
    ],
  });
};
