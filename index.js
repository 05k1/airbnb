import express from "express";
import dotenv from "dotenv";
import rootRoutes from "./src/routes/rootRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(rootRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
