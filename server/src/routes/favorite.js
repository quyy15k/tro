import express from "express";
import * as favoriteController from "../controllers/favorite";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.use(verifyToken);
router.post("/add/:postId", favoriteController.addToFavorite);
router.post("/remove/:postId", favoriteController.removeFromFavorite);
router.get("/post", favoriteController.listPostFavorite);

export default router;
