import express from "express";
import * as postController from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";
import parseUserInfoFormToken from "../middlewares/parseUserInfoFormToken";
import verifyAdminToken from "../middlewares/verifyAdminToken";

const router = express.Router();

router.get("/all", postController.getPosts);
router.get("/limit", parseUserInfoFormToken, postController.getPostsLimit);
router.get("/new-post", postController.getNewPosts);
router.use(verifyToken);
router.post("/create-new", postController.createNewPosts);
router.get("/limit-admin", postController.getPostsLimitAdmin);
router.put("/update", postController.updatePost);
router.delete("/delete", postController.deletePost);
router.use(verifyAdminToken);
router.put("/status/:id", postController.updateStatusPost);

export default router;
