import express from "express";
import * as controllers from "../controllers/price";
import verifyAdminToken from "../middlewares/verifyAdminToken";
const router = express.Router();

router.get("/all", controllers.getPrices);
router.use(verifyAdminToken);
router.delete("/delete/:id", controllers.deletePrice);
router.put("/update/:id", controllers.updatePrice);
router.put("/create", controllers.createPrice);
router.delete("/delete/:id", controllers.deletePrice);

export default router;
