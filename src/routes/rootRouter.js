import express from "express";
import authRoutes from "./authRouter.js";
import userRoutes from "./userRouter.js";
import roomRoutes from "./roomRouter.js";
import locationRoutes from "./locationRouter.js";
import commentRoutes from "./commentRouter.js";
import bookingRoutes from "./bookingRouter.js";

const rootRoutes = express.Router();
rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/users", userRoutes);
rootRoutes.use("/rooms", roomRoutes);
rootRoutes.use("/locations", locationRoutes);
rootRoutes.use("/comments", commentRoutes);
rootRoutes.use("/bookings", bookingRoutes);

export default rootRoutes;
