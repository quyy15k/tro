import express from "express";
import * as controllers from "../controllers/summary";
import verifyAdminToken from "../middlewares/verifyAdminToken";
const router = express.Router();

router.use(verifyAdminToken);

router.get("/overview", controllers.getOverview);
router.get("/user-summay", controllers.userSummay);
router.get("/post-summay", controllers.postSummay);

export default router;
