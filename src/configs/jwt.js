import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};
