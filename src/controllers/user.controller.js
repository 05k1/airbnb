import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { httpCode } from "../configs/constant.js";

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
    const { name, email, password, phone, birth_date, gender } = req.body;
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

export { getAllUser, createUser, deleteUser };
