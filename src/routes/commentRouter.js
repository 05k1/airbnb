import express from "express";
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getCommentById,
} from "../controllers/comment.controller.js";

const commentRoutes = express.Router();

commentRoutes.post("/create-comment", createComment);
commentRoutes.get("/get-comment", getComment);
commentRoutes.put("/update-comment/:id", updateComment);
commentRoutes.delete("/delete-comment/:id", deleteComment);
commentRoutes.get("/get-comment-by-id/:id", getCommentById);

export default commentRoutes;
