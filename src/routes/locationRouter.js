import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import uploadCloud from "../middlewares/uploader.js";
import {
  createLocation,
  getLocation,
  getLocationById,
  searchPagination,
  updateLocation,
  deleteLocation,
} from "../controllers/location.controller.js";

const locationRoutes = express.Router();

locationRoutes.post(
  "/",
  authMiddleware,
  uploadCloud.single("image"),
  createLocation
);
locationRoutes.get("/", getLocation);
locationRoutes.get("/:id", getLocationById);
locationRoutes.get("/search-pagination", searchPagination);
locationRoutes.put(
  "/:id",
  authMiddleware,
  uploadCloud.single("image"),
  updateLocation
);
locationRoutes.delete("/:id", authMiddleware, deleteLocation);

export default locationRoutes;
