import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const userMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(403).json({
        message: "Unauthorized Access - user Access Token not provided",
      });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findOne({ _id: decoded.userId }).select(
        "-password"
      );

      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }
      next();
      req.user = user;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(500).json({ message: "Acess Token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log(`Error in user middleware ${error.message}`);
    res.status(403).json({
      message: "Unauthorized Access - user Access Token not provided",
    });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};
