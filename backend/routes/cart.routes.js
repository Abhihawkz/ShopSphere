import { Router } from "express";
import {
  addToCart,
  getCardProducts,
  removeAllFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";

const router = Router();

router.get("/", getCardProducts);
router.post("/", addToCart);
router.delete("/", removeAllFromCart);
router.put("/:id", updateQuantity);

export default router;
