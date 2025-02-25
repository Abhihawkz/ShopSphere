import express from "express";
import { checkoutSuccess, createCheckoutSession } from "../controller/payment.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", userMiddleware , createCheckoutSession);
router.post("/checkout-success", userMiddleware, checkoutSuccess);

export default router;