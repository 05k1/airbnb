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
roomRoutes.get("/get-list", getListRoom);
roomRoutes.get("/get-list-pagination", searchPage);
roomRoutes.get("/get-room-by-id/:id", getRoomById);
roomRoutes.put(
  "/update-room/:id",
  authMiddleware,
  uploadCloud.single("image"),
  updateRoom
);
roomRoutes.delete("/delete-room/:id", authMiddleware, deleteRoom);

export default roomRoutes;
