import express from "express";
import {
  getAllUser,
  createUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();
userRoutes.get("/", getAllUser);
userRoutes.post("/", createUser);
userRoutes.delete("/", deleteUser);

export default userRoutes;
