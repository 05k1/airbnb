import express from "express";
import {
  createRoom,
  getListRoom,
  searchPage,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import uploadCloud from "../middlewares/uploader.js";

const roomRoutes = express.Router();

roomRoutes.post("/", authMiddleware, uploadCloud.single("image"), createRoom);
roomRoutes.get("/", getListRoom);
roomRoutes.get("/rooms", searchPage);
roomRoutes.get("/:id", getRoomById);
roomRoutes.put("/:id", authMiddleware, uploadCloud.single("image"), updateRoom);
roomRoutes.delete("/:id", authMiddleware, deleteRoom);

export default roomRoutes;
