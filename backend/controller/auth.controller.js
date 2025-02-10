import { redis } from "../lib/redis.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: " User already exists" });
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);
    res.status(201).json({
      user: {
        userId: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      message: "User has been created.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while creating user ${error.message}` });
  }
};
export const login = async (req, res) => {
  res.send("login page");
};
export const logout = async (req, res) => {
  res.send("logout page");
};
