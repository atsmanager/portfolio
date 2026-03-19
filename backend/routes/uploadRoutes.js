import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import protect from "../middleware/auth.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

// Cloudinary Storage Configuration
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_uploads",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images and PDFs only!");
  }
}

const upload = multer({
  storage: isCloudinaryConfigured ? cloudinaryStorage : storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", protect, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }
  
  // Return Cloudinary URL if available, otherwise fallback to local URL
  const fileUrl = isCloudinaryConfigured ? req.file.path : `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  
  res.send({
    message: isCloudinaryConfigured ? "File Uploaded to Cloudinary" : "File Uploaded Locally (Cloudinary not configured)",
    url: fileUrl,
  });
});

export default router;
