import express from "express";
import {
  extendToken,
  login,
  register,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/extend-token", extendToken);

export default authRoutes;
