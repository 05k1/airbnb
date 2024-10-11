import jwt from "jsonwebtoken";
import { httpCode } from "../configs/constant.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(httpCode.UNAUTHORIZED)
        .json({ message: "Khong co token" });
    }
    const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(httpCode.UNAUTHORIZED)
      .json({ message: "error", error: error.message });
  }
};
