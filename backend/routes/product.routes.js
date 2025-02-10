import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controller/product.controller.js";
import {
  adminMiddleware,
  userMiddleware,
} from "../middleware/user.middleware.js";

const router = Router();

router.get("/", userMiddleware, adminMiddleware, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", createProduct);
router.patch("/:id", userMiddleware, adminMiddleware, toggleFeaturedProduct);
router.delete("/:id", userMiddleware, adminMiddleware, deleteProduct);

export default router;
