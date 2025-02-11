import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { getCoupon, validateCoupon } from "../controller/coupon.controller.js";

const router = Router();

router.get("/",userMiddleware,getCoupon)
router.get("/validate",userMiddleware,validateCoupon)


export default router;