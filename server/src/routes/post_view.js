import express from "express";
import * as postViewController from "../controllers/post_view";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.use(verifyToken);
router.post("/create-post_view", postViewController.createNewPostView);
router.get("/list-post_view", postViewController.getALlPostView);

export default router;
