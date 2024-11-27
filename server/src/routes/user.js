import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/user";
import verifyAdminToken from "../middlewares/verifyAdminToken";

const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
router.put("/", userController.updateUser);
router.use(verifyAdminToken);
router.get("/get-all-user", userController.getAllUser);
router.put("/admin-update-user/:id", userController.adminUpdateUserInfo);
router.post("/admin-create-user", userController.adminCreateUserInfo);

export default router;
