import express from "express";
import * as feedbackController from "../controllers/feedback";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.get("/list/:postId", feedbackController.listFeedbackByPostId);
router.use(verifyToken);
router.post("/create", feedbackController.createFeedback);
router.put("/update/:feedbackId", feedbackController.updateFeedback);
router.delete("/delete/:feedbackId", feedbackController.deleteFeedback);

export default router;
