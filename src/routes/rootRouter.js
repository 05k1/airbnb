import express from "express";
import authRoutes from "./authRouter.js";
import userRoutes from "./userRouter.js";

const rootRoutes = express.Router();
rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/users", userRoutes);

export default rootRoutes;
