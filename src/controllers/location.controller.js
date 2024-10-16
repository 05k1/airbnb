import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { httpCode } from "../configs/constant.js";
import { Op } from "sequelize";
import { getPublicIdFromUrl } from "../configs/configImage.js";
import { v2 as cloudinary } from "cloudinary";

const model = initModels(sequelize);

const createLocation = async (req, res) => {
  try {
    let { location_name, city, country } = req.body;
    let image = req.file;
    if (!image) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Image Not Found" });
    }
    const data = await model.locations.create({
      location_name,
      city,
      country,
      image_url: image.path,
    });
    return res
      .status(httpCode.CREATED)
      .json({ message: "Tao vi tri thanh cong" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const getLocation = async (req, res) => {
  try {
    const data = await model.locations.findAll();
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await model.locations.findByPk(id);
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

const searchPagination = async (req, res) => {
  try {
    let { page, size, keyword } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const offset = (page - 1) * size;

    if (isNaN(page) && page <= 0) {
      return res.status(httpCode.BAD_REQUEST);
    }
    if (isNaN(size) && size <= 0) {
      return res.status(httpCode.BAD_REQUEST);
    }
    const data = await model.locations.findAll({
      where: {
        location_name: {
          [Op.like]: `%${keyword}%`,
        },
      },
      limit: size,
      offset,
    });
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { location_name, city, country } = req.body;
    let image = req.file;
    const checkLocation = await model.locations.findByPk(id);
    if (!checkLocation) {
      return res.status(httpCode.NOT_FOUND).json({ message: "not found" });
    }
    const public_id = getPublicIdFromUrl(checkLocation.image_url);
    if (!image) {
      await model.locations.update(
        { location_name, city, country },
        {
          where: {
            location_id: id,
          },
        }
      );
      return res.status(httpCode.OK).json({ message: "cap nhat thanh cong" });
    }
    await cloudinary.uploader.destroy(public_id);
    await model.locations.update(
      {
        location_name,
        city,
        country,
        image_url: image.path,
      },
      {
        where: {
          location_id: id,
        },
      }
    );
    return res.status(httpCode.OK).json({ message: "cap nhat thanh cong" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const checkLocation = await model.locations.findByPk(id);
    if (!checkLocation) {
      return res.status(httpCode.NOT_FOUND).json({ message: "not found" });
    }
    const public_id = getPublicIdFromUrl(checkLocation.image_url);
    await cloudinary.api.delete_resources(public_id);
    await checkLocation.destroy();
    return res.status(httpCode.OK).json({ message: "success" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

export {
  createLocation,
  getLocation,
  getLocationById,
  searchPagination,
  updateLocation,
  deleteLocation,
};
