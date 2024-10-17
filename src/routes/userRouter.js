import express from "express";
import {
  getAllUser,
  createUser,
  deleteUser,
  pageSearch,
  getUserById,
  updateUser,
  uploadAvatar,
} from "../controllers/user.controller.js";

import uploadCloud from "../middlewares/uploader.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();
userRoutes.get("/", getAllUser);
userRoutes.post("/", createUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.get("/users", pageSearch);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.post(
  "/upload-avatar",
  authMiddleware,
  uploadCloud.single("image"),
  uploadAvatar
);

export default userRoutes;
