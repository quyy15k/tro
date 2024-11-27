import express from "express";
import * as controllers from "../controllers/category";
import verifyAdminToken from "../middlewares/verifyAdminToken";

const router = express.Router();

router.get("/all", controllers.getCategories);
router.use(verifyAdminToken);
router.delete("/delete/:id", controllers.deleteCategory);
router.put("/update/:id", controllers.updateCategory);
router.put("/create", controllers.createCategory);
router.delete("/delete/:id", controllers.deleteCategory);


export default router;
