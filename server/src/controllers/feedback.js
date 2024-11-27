import * as feedbackService from "../services/feedback";

export const createFeedback = async (req, res) => {
  const { postId, rating, comment } = req.body;
  const { user } = req;

  try {
    // vaidate req.body
    {
      const errors = [];

      // validate `postId`
      if (!postId) {
        errors.push("Post ID is required.");
      }
      // validate `comment`
      if (comment !== undefined) {
        if (typeof comment !== "string") {
          errors.push("Comment must be a string.");
        } else if (comment.length > 500) {
          errors.push(
            "Comment exceeds maximum length allowed (500 characters)."
          );
        }
      }

      // validate `rating`
      if (rating === undefined) {
        errors.push("Rating is required.");
      } else if (typeof rating !== "number" || !Number.isInteger(rating)) {
        errors.push("Rating must be an integer.");
      } else if (rating < 1 || rating > 5) {
        errors.push("Rating must be a number between 1 and 5.");
      }

      if (errors.length > 0)
        return res.status(500).json({
          err: -1,
          msg: "Validation errors: " + errors.join(", "),
        });
    }

    const feedback = await feedbackService.createFeedback({
      userId: user.id,
      postId,
      rating,
      comment,
    });

    return res.status(200).json(feedback);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at controller: " + error,
    });
  }
};

export const updateFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { rating, comment } = req.body;
  const { user } = req;

  try {
    // vaidate req.body
    {
      const errors = [];

      // validate `feedbackId`
      if (!feedbackId) errors.push("Feedback ID is required.");

      // validate `comment`
      if (comment !== undefined) {
        if (typeof comment !== "string") {
          errors.push("Comment must be a string.");
        } else if (comment.length > 500) {
          errors.push(
            "Comment exceeds maximum length allowed (500 characters)."
          );
        }
      }

      // validate `rating`
      if (rating === undefined) {
        errors.push("Rating is required.");
      } else if (typeof rating !== "number" || !Number.isInteger(rating)) {
        errors.push("Rating must be an integer.");
      } else if (rating < 1 || rating > 5) {
        errors.push("Rating must be a number between 1 and 5.");
      }

      if (errors.length > 0)
        return res.status(500).json({
          err: -1,
          msg: "Validation errors: " + errors.join(", "),
        });
    }

    const feedback = await feedbackService.updateFeedback({
      feedbackId,
      userId: user.id,
      rating,
      comment,
    });

    return res.status(200).json(feedback);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at controller: " + error,
    });
  }
};

export const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { user } = req;

  try {
    // validate `feedbackId`
    if (!feedbackId)
      return res.status(400).json({
        err: 1,
        msg: "Feedback ID is required.",
      });

    await feedbackService.deleteFeedback({ feedbackId, userId: user.id });
    return res.status(200).json({
      err: 0,
      message: "Delete success!",
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at controller: " + error,
    });
  }
};

export const listFeedbackByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    // validate `feedbackId`
    if (!postId)
      return res.status(400).json({
        err: 1,
        msg: "Post ID is required.",
      });

    const feddbacks = await feedbackService.listFeedbackByPostId({ postId });

    return res.status(200).json(feddbacks);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at controller: " + error,
    });
  }
};
