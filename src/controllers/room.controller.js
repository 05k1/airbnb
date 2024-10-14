import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { httpCode } from "../configs/constant.js";
import { Op, where } from "sequelize";
import { getPublicIdFromUrl } from "../configs/configImage.js";
import { v2 as cloudinary } from "cloudinary";

const model = initModels(sequelize);

const createRoom = async (req, res) => {
  try {
    let {
      room_name,
      guest_capacity,
      bedrooms,
      beds,
      bathrooms,
      description,
      price_per_night,
    } = req.body;
    const anh = req.file;
    console.log(anh);
    let image = req.file.path;
    if (!image) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Image Not Found" });
    }
    const data = await model.rooms.create({
      room_name,
      guest_capacity,
      bedrooms,
      beds,
      bathrooms,
      description,
      price_per_night,
      image_url: image,
    });
    return res
      .status(httpCode.CREATED)
      .json({ message: "Tao phong thanh cong", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const getListRoom = async (req, res) => {
  try {
    const data = await model.rooms.findAll();
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const searchPage = async (req, res) => {
  try {
    let { page, size, keyword } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const offset = (page - 1) * size;

    if (isNaN(page) || isNaN(size)) {
      return res.status(httpCode.BAD_REQUEST);
    }
    const data = await model.rooms.findAll({
      where: {
        room_name: {
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

const getRoomById = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await model.rooms.findByPk(id);
    if (!data) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Room khong ton tai" });
    }
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let {
      room_name,
      guest_capacity,
      bedrooms,
      beds,
      bathrooms,
      description,
      price_per_night,
    } = req.body;

    // Kiểm tra sự tồn tại của phòng
    const checkRoom = await model.rooms.findByPk(id);
    if (!checkRoom) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Room khong ton tai" });
    }

    // Lấy public_id từ URL của ảnh cũ
    const public_id = getPublicIdFromUrl(checkRoom.image_url);
    console.log(public_id);
    let image = req.file;

    // Nếu không có hình ảnh mới, chỉ cập nhật các trường khác
    if (!image) {
      await model.rooms.update(
        {
          room_name,
          guest_capacity,
          bedrooms,
          beds,
          bathrooms,
          description,
          price_per_night,
        },
        {
          where: {
            room_id: id,
          },
        }
      );
      return res.status(httpCode.OK).json({ message: "Cập nhật thành công" });
    }

    // Nếu có hình ảnh mới, xóa hình ảnh cũ trên Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);
    await model.rooms.update(
      {
        room_name,
        guest_capacity,
        bedrooms,
        beds,
        bathrooms,
        description,
        price_per_night,
        image_url: image.path, // Lưu URL hình ảnh mới
      },
      {
        where: {
          room_id: id,
        },
      }
    );

    return res.status(httpCode.OK).json({ message: "Cập nhật thành công" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    let { id } = req.params;
    const checkRoom = await model.rooms.findByPk(id);
    if (!checkRoom) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Room khong ton tai" });
    }
    const public_id = getPublicIdFromUrl(checkRoom.image_url);
    await cloudinary.uploader.destroy(public_id);
    await model.rooms.destroy({
      where: {
        room_id: id,
      },
    });
    return res.status(httpCode.OK).json({ message: "delete thanh cong" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

export {
  createRoom,
  getListRoom,
  searchPage,
  getRoomById,
  updateRoom,
  deleteRoom,
};
