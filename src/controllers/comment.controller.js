import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { httpCode } from "../configs/constant.js";
import { Op } from "sequelize";
import { getPublicIdFromUrl } from "../configs/configImage.js";
import { v2 as cloudinary } from "cloudinary";

const model = initModels(sequelize);

const createComment = async (req, res) => {
  try {
    const { room_id, user_id, comment_date, content, rating } = req.body;
    const data = await model.comments.create({
      room_id,
      user_id,
      comment_date,
      content,
      rating,
      last_updated: new Date(),
    });
    return res
      .status(httpCode.CREATED)
      .json({ message: "Tao comment thanh cong", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const data = await model.comments.findAll();
    return res.status(httpCode.OK).json({ message: "success", data });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const checkComment = await model.comments.findByPk(id);
    const { room_id, user_id, comment_date, content, rating } = req.body;

    if (!checkComment) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Khong co comment nay" });
    }
    await model.comments.update(
      { room_id, user_id, comment_date, content, rating },
      { where: { comment_id: id } }
    );
    return res.status(httpCode.OK).json({ message: "update thanh cong" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const checkComment = await model.comments.findByPk(id);
    if (!checkComment) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Khong co comment nay" });
    }
    await checkComment.destroy();
    return res.status(httpCode.NO_CONTENT).json({ message: "success" });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const checkComment = await model.comments.findByPk(id);
    if (!checkComment) {
      return res
        .status(httpCode.NOT_FOUND)
        .json({ message: "Khong co comment nay" });
    }
    return res
      .status(httpCode.OK)
      .json({ message: "success", data: checkComment });
  } catch (error) {
    return res
      .status(httpCode.SERVER_INTERNAL_ERROR)
      .json({ message: "Loi server", error: error.message });
  }
};

export {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getCommentById,
};
