import { Router } from "express";
import {
  addToCart,
  getCardProducts,
  removeAllFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const router = Router();

router.get("/", userMiddleware, getCardProducts);
router.post("/", userMiddleware, addToCart);
router.delete("/", userMiddleware, removeAllFromCart);
router.put("/:id", userMiddleware, updateQuantity);

export default router;
