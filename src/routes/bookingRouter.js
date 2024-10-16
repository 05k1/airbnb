import express from "express";
import {
  getListBooking,
  getBookingById,
  getBookingByUserId,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";

const bookingRoutes = express.Router();

bookingRoutes.get("/", getListBooking);
bookingRoutes.get("/:id", getBookingById);
bookingRoutes.get("/:user_id", getBookingByUserId);
bookingRoutes.post("/", createBooking);
bookingRoutes.put("/:id", updateBooking);
bookingRoutes.delete("/:id", deleteBooking);

export default bookingRoutes;
