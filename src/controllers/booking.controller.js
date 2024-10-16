import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { httpCode } from "../configs/constant.js";
import { Op } from "sequelize";
import { getPublicIdFromUrl } from "../configs/configImage.js";
import { v2 as cloudinary } from "cloudinary";
import bookings from "../models/bookings.js";

const model = initModels(sequelize);

const getListBooking = async (req, res) => {
  try {
    const data = await model.bookings.findAll();
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.bookings.findByPk(id);
    if (!data) {
      return res.status(httpCode.NOT_FOUND).json({ message: "Not found" });
    }
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const getBookingByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await model.bookings.findAll({
      where: {
        user_id,
      },
    });
    if (!data) {
      return res.status(httpCode.NOT_FOUND).json({ message: "User Not found" });
    }
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { room_id, check_in, check_out, guest_count, user_id } = req.body;
    const data = await model.bookings.create({
      room_id,
      check_in,
      check_out,
      guest_count,
      user_id,
    });
    return res.status(httpCode.CREATED).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { room_id, check_in, check_out, guest_count, user_id } = req.body;
    const data = await model.bookings.findByPk(id);
    if (!data) {
      return res.status(httpCode.NOT_FOUND).json({ message: "Not found" });
    }
    await model.bookings.update(
      { room_id, check_in, check_out, guest_count, user_id },
      {
        where: {
          booking_id: id,
        },
      }
    );
    return res.status(httpCode.OK).json({ message: "success" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.bookings.findByPk(id);
    if (!data) {
      return res.status(httpCode.NOT_FOUND).json({ message: "Not found" });
    }
    await data.destroy();
    return res.status(httpCode.OK).json({ message: "delete success" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

export {
  getListBooking,
  getBookingById,
  getBookingByUserId,
  createBooking,
  updateBooking,
  deleteBooking,
};
