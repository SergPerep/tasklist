import express from "express";
const router = express.Router();
import requireAuth from "../../middlewares/requireAuth";
import userController from "./usersController";

router.post("/", userController.user_checkName_post);

router.delete("/", requireAuth, userController.user_delete);

export default router;