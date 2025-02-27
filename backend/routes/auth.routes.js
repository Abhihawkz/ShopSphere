import { Router } from "express";
import { getProfile, login, logout, refreshTokenController, register } from "../controller/auth.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const router = Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/refresh-token",refreshTokenController)
router.get("/profile",userMiddleware,getProfile)
export default router;