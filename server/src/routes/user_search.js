import express from "express";
import * as userSearchController from "../controllers/user_search";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.get("/top-search", userSearchController.getTopKeywords);
router.use(verifyToken);
router.post("/create-user-search", userSearchController.createNewUserSearch);
router.get("/list-search-history", userSearchController.getALlUserSearch);
router.delete("/delete-search-history", userSearchController.deleteUserSearch);

export default router;
