import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import connectDb from "./lib/db.js";
import cartRoutes from "./routes/cart.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import coupenRoutes from "./routes/coupon.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:"http://localhost:5173"
}))
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupon", coupenRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Sever is running in http://localhost:${PORT}`);
});
