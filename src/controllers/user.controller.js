import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { httpCode } from "../configs/constant.js";
import { Op, where } from "sequelize";

const model = initModels(sequelize);

const getAllUser = async (req, res) => {
  try {
    const data = await model.users.findAll();
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    let { name, email, password, phone, birth_date, gender } = req.body;
    const data = await model.users.create({
      name,
      email,
      password,
      phone,
      birth_date,
      gender,
    });
    return res
      .status(httpCode.CREATED)
      .json({ message: "Tao user thanh cong", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await model.users.findByPk(id);
    if (!user) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "User khong ton tai" });
    }
    await user.destroy();
    return res.status(httpCode.NO_CONTENT).send();
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const pageSearch = async (req, res) => {
  try {
    let { page, size, keyword } = req.query;
    page = parseInt(page) || 1;
    size = parseInt(size) || 10;

    if (page <= 0 || isNaN(page)) {
      return res.status(httpCode.BAD_REQUEST);
    }
    if (size <= 0 || isNaN(size)) {
      return res.status(httpCode.BAD_REQUEST);
    }
    const offset = (page - 1) * size;
    const data = await model.users.findAll({
      where: {
        name: { [Op.like]: `%${keyword}%` },
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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.users.findOne({
      where: {
        user_id: id,
      },
    });
    if (!data) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "User khong ton tai" });
    }
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await model.users.findByPk(id);
    let {
      name,
      email,
      phone,
      birth_date = user.birth_date,
      gender = user.gender,
      role = user.role,
    } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(httpCode.BAD_REQUEST)
        .json({ message: "Name, email, and phone are required." });
    }
    const data = await model.users.update(
      { name, email, phone, birth_date, gender, role },
      {
        where: {
          user_id: id,
        },
      }
    );
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const image = req.file;
    const { userId } = req.user;
    if (!image) {
      return res.status(httpCode.NOT_FOUND).json({ message: "File Not Found" });
    }

    await model.users.update(
      { avatar: image.path },
      {
        where: { user_id: userId },
      }
    );
    return res.status(httpCode.OK).json({ message: "upload thanh cong" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

export {
  getAllUser,
  createUser,
  deleteUser,
  pageSearch,
  getUserById,
  updateUser,
  uploadAvatar,
};
