import { Router } from "express";
import { login, logout, refreshTokenController, register } from "../controller/auth.controller.js";

const router = Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/refresh-token",refreshTokenController)
export default router;