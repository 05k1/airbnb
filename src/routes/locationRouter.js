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
  "/create-location",
  authMiddleware,
  uploadCloud.single("image"),
  createLocation
);
locationRoutes.get("/get-location", getLocation);
locationRoutes.get("/get-location-by-id/:id", getLocationById);
locationRoutes.get("/search-pagination", searchPagination);
locationRoutes.put(
  "/update-location/:id",
  authMiddleware,
  uploadCloud.single("image"),
  updateLocation
);
locationRoutes.delete("/delete-location/:id", authMiddleware, deleteLocation);

export default locationRoutes;
