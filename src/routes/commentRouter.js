import express from "express";
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getCommentById,
} from "../controllers/comment.controller.js";

const commentRoutes = express.Router();

commentRoutes.post("/", createComment);
commentRoutes.get("/", getComment);
commentRoutes.put("/:id", updateComment);
commentRoutes.delete("/:id", deleteComment);
commentRoutes.get("/:id", getCommentById);

export default commentRoutes;
