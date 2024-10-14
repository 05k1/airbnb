import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary,
  // allowedFormats: ["jpg", "png"],
  allowedFormats: ["jpg", "png", "webp"], // Cho phép cả webp
  // transformation: [{ format: "jpg" }], // Chuyển đổi tất cả tệp thành jpg
  params: {
    folder: "airbnb",
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;
