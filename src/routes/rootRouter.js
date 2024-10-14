import express from "express";
import authRoutes from "./authRouter.js";
import userRoutes from "./userRouter.js";
import roomRoutes from "./roomRouter.js";

const rootRoutes = express.Router();
rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/users", userRoutes);
rootRoutes.use("/room", roomRoutes);

export default rootRoutes;
