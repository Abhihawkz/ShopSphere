import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectDb from "./lib/db.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    connectDb();   
  console.log(`Sever is running in http://localhost:${PORT}`);
});
